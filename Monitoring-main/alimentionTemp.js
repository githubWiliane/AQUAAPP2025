import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AlimentationScreen({ navigation }) {
  
  
  
  const [nombrePoissons, setNombrePoissons] = useState('');
  const [poidsTotal, setPoidsTotal] = useState('');
  const [resultat, setResultat] = useState('');

  // États pour les heures de distribution
  const [heure1, setHeure1] = useState(new Date());
  const [heure2, setHeure2] = useState(new Date());
  const [heure3, setHeure3] = useState(new Date());

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);

  // État pour le régulateur
  const [isRegulatorOn, setIsRegulatorOn] = useState(false);

  const calculerAlimentation = () => {
    if (nombrePoissons && poidsTotal) {
      const quantiteAlimentation = (parseFloat(poidsTotal) / parseInt(nombrePoissons)) * 0.03;
      setResultat(`Quantité d'alimentation: ${quantiteAlimentation.toFixed(2)} kg`);
    } else {
      setResultat('Veuillez entrer les deux valeurs');
    }
  };

  const formatHeure = (date) => {
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${heures}:${minutes}`;
  };

  const toggleSwitch = () => setIsRegulatorOn(previousState => !previousState);

  
  
  
  
  
  
  
  const [tutorialStep, setTutorialStep] = useState(0); // Étape du tutoriel
  const [opacity] = useState(new Animated.Value(0)); // Animation de clignotement pour la flèche
  const [tutorialActive, setTutorialActive] = useState(true); // État du tutoriel actif ou non

  // Animation de clignotement
  useEffect(() => {
    if (tutorialActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [opacity, tutorialActive]);

  // Texte explicatif et positions pour chaque étape
  const tutorialData = [
    { text: "Ceci est la température de l'eau", top: 100, left: 60 },
    { text: "Ceci est la température de l'air", top: 100, left: 200 },
    { text: "Ceci est l'humidité de l'air", top: 300, left: 60 },
    { text: "Ceci est la pression atmosphérique", top: 300, left: 200 },
    { text: "Appuyez ici pour accéder à l'alimentation", top: 500, left: 100 },
  ];

  // Fonction pour passer à l'étape suivante
  const handleNextStep = () => {
    if (tutorialStep < tutorialData.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      closeTutorial(); // Ferme le tutoriel à la dernière étape
    }
  };

  // Fonction pour fermer le tutoriel
  const closeTutorial = () => {
    setTutorialActive(false); // Désactive le tutoriel
    setTutorialStep(0); // Réinitialise les étapes pour un futur redémarrage
  };

  return (
    
    <View style={styles.container}>
    {/* Effet de gris pour le tutoriel */}
    {tutorialActive && tutorialStep < tutorialData.length && (
      <View style={styles.overlay}>
        <View
style={[
  styles.tooltip,
  {
    top: tutorialData[tutorialStep].top,
    left: tutorialData[tutorialStep].left,
  },
]}
>
<Text style={styles.tooltipText}>{tutorialData[tutorialStep].text}</Text>
<Animated.View
  style={[
    styles.arrow,
    { opacity, transform: [{ rotate: '45deg' }] }, // Clignotement et orientation
  ]}
/>
</View>


        {/* Bouton "Suivant" */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>
            {tutorialStep < tutorialData.length - 1 ? 'Suivant' : 'Terminer'}
          </Text>
        </TouchableOpacity>
      </View>
    )}


<View style={styles.container}>
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')}
        style={styles.icon}
        resizeMode="contain"
      />

     
      
      <Text style={styles.label}>Nombre total :</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez nombre total des poissons"
        keyboardType="numeric"
        value={nombrePoissons}
        onChangeText={setNombrePoissons}
      />

      <Text style={styles.label}>Poids total (kg) :</Text>
      <TextInput
        style={styles.input}
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

      {/* Sélecteurs d'heure */}
      <View style={styles.timeContainer}>
        <View style={styles.timeRow}>
          <Text style={styles.labelHeure}>Heure 1 :</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowPicker1(true)}>
            <Text style={styles.buttonText}>Sélectionner</Text>
          </TouchableOpacity>
          <Text style={styles.selectedTime}>{formatHeure(heure1)}</Text>
        </View>
        {showPicker1 && (
          <DateTimePicker
            value={heure1}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker1(false);
              if (selectedDate) {
                setHeure1(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.timeRow}>
          <Text style={styles.labelHeure}>Heure 2 :</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowPicker2(true)}>
            <Text style={styles.buttonText}>Sélectionner</Text>
          </TouchableOpacity>
          <Text style={styles.selectedTime}>{formatHeure(heure2)}</Text>
        </View>
        {showPicker2 && (
          <DateTimePicker
            value={heure2}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker2(false);
              if (selectedDate) {
                setHeure2(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.timeRow}>
          <Text style={styles.labelHeure}>Heure 3 :</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowPicker3(true)}>
            <Text style={styles.buttonText}>Sélectionner</Text>
          </TouchableOpacity>
          <Text style={styles.selectedTime}>{formatHeure(heure3)}</Text>
        </View>
        {showPicker3 && (
          <DateTimePicker
            value={heure3}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker3(false);
              if (selectedDate) {
                setHeure3(selectedDate);
              }
            }}
          />
        )}
      </View>

      {resultat ? <Text style={styles.resultat}>{resultat}</Text> : null}
    </View>

  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#002A37',
      padding: 20,
    },
    icon: {
      width: 160,
      height: 200,
      marginBottom: 40,
    },
    switchContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    regulatorLabel: {
      color: 'white',
      marginRight: 10,
    },
    label: {
      fontSize: 18,
      color: 'white',
      marginBottom: 6,
    },
    labelHeure: {
      fontSize: 18,
      color: 'white',
      marginRight: 10,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      width: '80%',
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    buttonContainer: {
      width: '80%',
      marginTop: 10,
      marginBottom: 10,
    },
    calculateButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    selectButton: {
      backgroundColor: 'gray', // Couleur d'arrière-plan grise
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    timeContainer: {
      alignItems: 'flex-start',
      marginTop: 10,
      width: '80%',
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    selectedTime: {
      fontSize: 16,
      color: 'white',
      marginLeft: 5,
    },
    resultat: {
      marginTop: 20,
      fontSize: 18,
      color: '#f5dd4b',
    },
});
