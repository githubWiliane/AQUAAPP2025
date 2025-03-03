import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function AlimentationScreen({ navigation }) {
  // États pour les heures
  const [heure1, setHeure1] = useState(new Date());
  const [heure2, setHeure2] = useState(new Date());
  const [heure3, setHeure3] = useState(new Date());

  // États pour afficher ou non le DateTimePicker
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);

  // Autres états
  const [nombrePoissons, setNombrePoissons] = useState('');
  const [poidsTotal, setPoidsTotal] = useState('');
  const [resultat, setResultat] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDistribuer, setIsDistribuer] = useState(false);
  const [typeAliment, setTypeAliment] = useState('Poudre');

  // Adresse (ou IP) de l'ESP32 à adapter
  const ESP32_IP = '192.168.4.1';

  // Charger l'état sauvegardé du switch "Distribuer"
  useEffect(() => {
    const loadDistribuerState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('@isDistribuer');
        if (storedValue !== null) {
          setIsDistribuer(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'état du switch 'Distribuer':", error);
      }
    };
    loadDistribuerState();
  }, []);

  // Charger les heures sauvegardées au montage du composant
  useEffect(() => {
    const loadHeures = async () => {
      try {
        const storedHeure1 = await AsyncStorage.getItem('@heure1');
        const storedHeure2 = await AsyncStorage.getItem('@heure2');
        const storedHeure3 = await AsyncStorage.getItem('@heure3');
        if (storedHeure1 !== null) {
          setHeure1(new Date(parseInt(storedHeure1)));
        }
        if (storedHeure2 !== null) {
          setHeure2(new Date(parseInt(storedHeure2)));
        }
        if (storedHeure3 !== null) {
          setHeure3(new Date(parseInt(storedHeure3)));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des heures sauvegardées:", error);
      }
    };
    loadHeures();
  }, []);

  // Sauvegarder l'état du switch "Distribuer"
  const onToggleDistribuer = async (newValue) => {
    setIsDistribuer(newValue);
    try {
      await AsyncStorage.setItem('@isDistribuer', JSON.stringify(newValue));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'état du switch 'Distribuer':", error);
    }
  };

  // Sauvegarder automatiquement les heures à chaque modification
  useEffect(() => {
    const saveHeures = async () => {
      try {
        await AsyncStorage.setItem('@heure1', heure1.getTime().toString());
        await AsyncStorage.setItem('@heure2', heure2.getTime().toString());
        await AsyncStorage.setItem('@heure3', heure3.getTime().toString());
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des heures:", error);
      }
    };
    saveHeures();
  }, [heure1, heure2, heure3]);

  // Basculer entre thème clair/sombre
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Calcul de l'alimentation en grammes
  // Si un résultat est déjà affiché, un nouveau clic l'efface.
  const calculerAlimentation = () => {
    if (resultat) {
      setResultat('');
      return;
    }
    if (nombrePoissons && poidsTotal) {
      const nbPoissons = Number(nombrePoissons);
      const poids = Number(poidsTotal);

      if (!isNaN(nbPoissons) && nbPoissons > 0 && !isNaN(poids) && poids > 0) {
        // Calcul basé sur 10% du poids total exprimé en grammes
        const quantiteAlimentation = poids * 0.10; 
        setResultat(`Quantité d'alimentation: ${quantiteAlimentation.toFixed(2)} g`);
      } else {
        setResultat('Veuillez saisir des valeurs valides.');
      }
    } else {
      setResultat('Veuillez saisir les deux valeurs.');
    }
  };

  // Formatage de l'heure en HH:MM
  const formatHeure = (date) => {
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${heures}:${minutes}`;
  };

  // --- Fonction pour activer le moteur via l'ESP32 ---
  const activerMoteur = async () => {
    try {
      const response = await fetch(`http://${ESP32_IP}/activateMotor`, {
        method: 'POST',
      });
      const result = await response.text();
      console.log('Réponse du serveur ESP32:', result);
    } catch (error) {
      console.error("Erreur lors de l'activation du moteur:", error);
    }
  };

  // --- Vérification périodique de l'heure ---
  useEffect(() => {
    let lastActivation = ""; // pour éviter les activations multiples dans la même minute
    const interval = setInterval(() => {
      const now = new Date();
      const currentHourMinute = formatHeure(now); // "HH:MM"
      if (
        isDistribuer &&
        (currentHourMinute === formatHeure(heure1) ||
          currentHourMinute === formatHeure(heure2) ||
          currentHourMinute === formatHeure(heure3))
      ) {
        if (currentHourMinute !== lastActivation) {
          console.log('Heure correspondante détectée, activation du moteur...');
          activerMoteur();
          lastActivation = currentHourMinute;
        }
      }
    }, 60000); // Vérifie toutes les 30 secondes

    return () => clearInterval(interval);
  }, [heure1, heure2, heure3, isDistribuer]);

  const themeStyles = isDarkTheme ? styles.dark : styles.light;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, themeStyles.container]}>
        <TouchableOpacity style={styles.themeIconContainer} onPress={toggleTheme}>
          <Icon
            name={isDarkTheme ? 'sunny' : 'moon'}
            size={30}
            color={isDarkTheme ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        <Image
          source={require('../AlimentationScreen/ALIMENTATION.png')}
          style={[styles.icon, { tintColor: isDarkTheme ? 'white' : 'black' }]}
          resizeMode="contain"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, bottom: 20 }}
        >
          <Picker
            selectedValue={typeAliment}
            onValueChange={(itemValue) => setTypeAliment(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Poudre" value="Poudre" />
            <Picker.Item label="Granuler" value="Granuler" />
          </Picker>
          <Text style={[styles.selectedAliment, { color: isDarkTheme ? 'white' : 'black' }]}>
            Type d'aliment sélectionné :{' '}
            <Text style={{ color: isDarkTheme ? '#9acd32' : 'green', fontWeight: 'bold' }}>
              {typeAliment}
            </Text>
          </Text>
        </KeyboardAvoidingView>

        <Text style={themeStyles.label}>Nombre total :</Text>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Entrez nombre total des poissons"
          keyboardType="numeric"
          value={nombrePoissons}
          onChangeText={setNombrePoissons}
        />

        <Text style={themeStyles.label}>Poids total (g) :</Text>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Entrez le poids total de vos poissons en grammes"
          keyboardType="numeric"
          value={poidsTotal}
          onChangeText={setPoidsTotal}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={calculerAlimentation}>
            <Text style={styles.buttonText}>CALCULER</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeContainer}>
          {[
            { heure: heure1, setShow: setShowPicker1, show: showPicker1, setTime: setHeure1 },
            { heure: heure2, setShow: setShowPicker2, show: showPicker2, setTime: setHeure2 },
            { heure: heure3, setShow: setShowPicker3, show: showPicker3, setTime: setHeure3 },
          ].map(({ heure, setShow, show, setTime }, index) => (
            <View key={index} style={styles.timeRow}>
              <Text style={themeStyles.labelHeure}>{`Heure ${index + 1} :`}</Text>
              <TouchableOpacity style={styles.selectButton} onPress={() => setShow(true)}>
                <Text style={styles.buttonText}>Sélectionner</Text>
              </TouchableOpacity>
              <Text style={themeStyles.selectedTime}>{formatHeure(heure)}</Text>
              {show && (
                <DateTimePicker
                  value={heure}
                  mode="time"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) {
                      setTime(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          ))}
        </View>

        {resultat ? <Text style={themeStyles.resultat}>{resultat}</Text> : null}

        <View style={styles.distribuerContainer}>
          <Text style={themeStyles.label}>Distribuer</Text>
          <Switch
            value={isDistribuer}
            onValueChange={onToggleDistribuer}
            thumbColor={isDistribuer ? '#007bff' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  themeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  icon: {
    top: 10,
    width: 100,
    height: 150,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    width: '85%',
    paddingHorizontal: 15,
    textAlignVertical: 'center',
    marginBottom: 15,
  },
  calculateButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingRight: 130,
    paddingLeft: 140,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '85%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  timeContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '85%',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  selectButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  distribuerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  light: {
    container: {
      backgroundColor: '#fff',
    },
    label: {
      color: '#000',
      marginRight: 10,
    },
    labelHeure: {
      color: '#000',
      marginRight: 10,
    },
    selectedTime: {
      color: '#000',
      marginLeft: 20,
    },
    resultat: {
      color: 'green',
    },
    input: {
      backgroundColor: '#fff',
      color: '#000',
      borderColor: '#ccc',
    },
    picker: {
      height: 50,
      width: '85%',
      marginBottom: 15,
      color: '#000',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    selectedAliment: {
      fontSize: 16,
      color: '#007bff',
      marginTop: 10,
    },
  },
  dark: {
    container: {
      backgroundColor: '#121212',
    },
    label: {
      color: '#fff',
      marginRight: 10,
    },
    labelHeure: {
      color: '#fff',
      marginRight: 10,
    },
    selectedTime: {
      color: '#fff',
      marginLeft: 20,
    },
    resultat: {
      color: '#9acd32',
    },
    input: {
      backgroundColor: '#333',
      color: '#fff',
      borderColor: '#fff',
    },
    picker: {
      height: 50,
      width: '85%',
      marginBottom: 15,
      color: '#000',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
  },
});
