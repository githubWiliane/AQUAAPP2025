import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function TableauDebord({ navigation }) {
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
    { text: "Ceci est la température de l'eau", top: 100, left: 20 },
    { text: "Ceci est la température de l'air", top: 100, left: 220 },
    { text: "Ceci est l'humidité de l'air", top: 300, left: 20 },
    { text: "Ceci est la pression atmosphérique", top: 300, left: 200 },
    { text: "Appuyez ici pour accéder à l'alimentation", top: 480, left: 80 },
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

      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.headerText}>TABLEAU DE BORD</Text>
      </View>

      {/* Paramètres */}
      <View style={styles.grid}>
        <View style={styles.parameter}>
          <CircularProgress
            value={50}
            radius={70}
            progressValueColor={'#fff'}
            duration={1000}
            strokeColorConfig={[
              { color: 'red', value: 0 },
              { color: 'skyblue', value: 50 },
              { color: 'yellowgreen', value: 100 },
            ]}
            valueSuffix={'°C'}
            progressValueStyle={{ fontSize: 26 }}
          />
          <Text style={styles.label}>T° de l'Eau</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress
            value={80}
            radius={70}
            progressValueColor={'#fff'}
            duration={1000}
            strokeColorConfig={[
              { color: 'red', value: 0 },
              { color: 'skyblue', value: 50 },
              { color: 'yellowgreen', value: 100 },
            ]}
            valueSuffix={'°C'}
            progressValueStyle={{ fontSize: 26 }}
          />
          <Text style={styles.label}>T° de l'Air</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress
            value={60}
            radius={70}
            progressValueColor={'#fff'}
            duration={1000}
            strokeColorConfig={[
              { color: 'red', value: 0 },
              { color: 'skyblue', value: 50 },
              { color: 'yellowgreen', value: 100 },
            ]}
            progressValueStyle={{ fontSize: 26 }}
          />
          <Text style={styles.label}>Humidité (Air)</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress
            value={30}
            radius={70}
            progressValueColor={'#fff'}
            duration={1000}
            strokeColorConfig={[
              { color: 'red', value: 0 },
              { color: 'skyblue', value: 50 },
              { color: 'yellowgreen', value: 100 },
            ]}
            valueSuffix={'Atm'}
            progressValueStyle={{ fontSize: 26 }}
          />
          <Text style={styles.label}>Préssion Atm</Text>
        </View>
      </View>

      {/* Bouton alimentation */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          closeTutorial();
          navigation.navigate('Alimentation');
        }}
      >
        <Text style={styles.buttonText}>ALIMENTATION</Text>
      </TouchableOpacity>

      {/* État de l'aérateur */}
      <View style={styles.aerator}>
        <Text style={styles.aeratorLabel}>État aérateur</Text>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, { backgroundColor: 'green' }]} />
          <View style={[styles.circle, { backgroundColor: 'red' }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002A37',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 33,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  parameter: {
    alignItems: 'center',
    margin: 10,
    width: '40%',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007ACC',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aerator: {
    alignItems: 'center',
    marginTop: 20,
  },
  aeratorLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  arrow: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#007ACC', // Couleur de la flèche
    borderRightWidth: 3,
    borderRightColor: '#007ACC',
    transform: [{ rotate: '45deg' }],
    marginTop: 5,
  },
  
  
  nextButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#007ACC',
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
