import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AlimentationScreen({ navigation }) {
  const [nombrePoissons, setNombrePoissons] = useState('');
  const [poidsTotal, setPoidsTotal] = useState('');
  const [resultat, setResultat] = useState('');

  const [heure1, setHeure1] = useState(new Date());
  const [heure2, setHeure2] = useState(new Date());
  const [heure3, setHeure3] = useState(new Date());

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const calculerAlimentation = () => {
    if (nombrePoissons && poidsTotal) {
      const quantiteAlimentation = (parseFloat(poidsTotal) / parseInt(nombrePoissons)) * 0.03;
      setResultat(`Quantité d'alimentation: ${quantiteAlimentation.toFixed(2)} kg`);
    } else {
      setResultat('Veuillez saisir les deux valeurs.');
    }
  };

  const formatHeure = (date) => {
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${heures}:${minutes}`;
  };

  const themeStyles = isDarkTheme ? styles.dark : styles.light;

  return (
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

      <Text style={themeStyles.label}>Nombre total :</Text>
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Entrez nombre total des poissons"
        keyboardType="numeric"
        value={nombrePoissons}
        onChangeText={setNombrePoissons}
      />

      <Text style={themeStyles.label}>Poids total (kg) :</Text>
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Entrez poids total de vos poissons"
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
        {[{ heure: heure1, setShow: setShowPicker1, show: showPicker1, setTime: setHeure1 },
          { heure: heure2, setShow: setShowPicker2, show: showPicker2, setTime: setHeure2 },
          { heure: heure3, setShow: setShowPicker3, show: showPicker3, setTime: setHeure3 }].map(
          ({ heure, setShow, show, setTime }, index) => (
            <View key={index} style={styles.timeRow}>
              <Text style={themeStyles.labelHeure}>{`Heure ${index + 1} :`}</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShow(true)}
              >
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
          )
        )}
      </View>

      {resultat ? <Text style={themeStyles.resultat}>{resultat}</Text> : null}
    </View>
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
    top:30,
    width: 140,
    height: 200,
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 25, // Arrondi plus prononcé
    width: '85%', // Largeur des champs
    paddingHorizontal: 15,
    textAlignVertical: 'center',
    marginBottom: 15, // Espace entre les champs
  },
  calculateButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15 ,
    paddingRight:130,
    paddingLeft:140,
    paddingVertical:15,
    borderRadius: 30,
    alignItems: 'center',
    width: '85%', // Même largeur que les champs de saisie
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
    marginBottom: 15, // Espacement entre les lignes
  },
  selectButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Bordures plus arrondies
  },
  light: {
    container: {
      backgroundColor: '#fff',
    },
    label: {
      color: '#000',
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
      color: '#000',
    },
    input: {
      backgroundColor: '#fff',
      color: '#000',
      borderColor: '#ccc',
    },
  },
  dark: {
    container: {
      backgroundColor: '#121212',
    },
    label: {
      color: '#fff',
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
      color: '#f5dd4b',
    },
    input: {
      backgroundColor: '#333',
      color: '#fff',
      borderColor: '#fff',
    },
  },
});

