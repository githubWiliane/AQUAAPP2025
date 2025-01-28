import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const TemperatureScreen = () => {
  const [isRegulatorOn, setIsRegulatorOn] = useState(false);
  const [temperature, setTemperature] = useState(0); // Valeur initiale de la température
  const backgroundColor = new Animated.Value(0); // Valeur initiale pour l'animation

  const toggleSwitch = () => setIsRegulatorOn((previousState) => !previousState);

  // Déterminer la couleur de la jauge en fonction de la température
  const getGaugeColorForTemperature = (temp) => {
    if (temp <= 15) return '#A0D6E8'; // Bleu clair pour la jauge lorsque <= 15°C
    if (temp >= 30) return '#FF6666'; // Rouge clair pour la jauge lorsque >= 30°C
    if (temp >= 15 && temp <= 28) return '#90EE90'; // Vert clair pour la jauge dans la plage [15°C, 28°C]
    return '#FFFF99'; // Jaune clair pour d'autres cas, si besoin
  };

  // Effet pour mettre à jour l'animation de l'arrière-plan à chaque changement de température
  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: temperature, // Utiliser la température comme valeur pour l'animation
      duration: 1000, // Durée de la transition en millisecondes
      useNativeDriver: false,
    }).start();
  }, [temperature]);

  // Calculer la couleur de fond en fonction de la température avec une transition progressive entre les nuances de bleu
  const animatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 5, 10, 15, 28, 30, 50],
    outputRange: ['#001f3f', '#003f7f', '#005fa1', '#87CEEB', '#006400', '#8B0000', '#8B0000'], // Plusieurs nuances de bleu jusqu'à 15°C
  });

  // Calculer la largeur de la jauge en fonction de la température
  const getGaugeWidth = (temp) => {
    const minTemp = 0;
    const maxTemp = 100;
    const normalizedTemp = Math.max(minTemp, Math.min(temp, maxTemp));
    const percentage = (normalizedTemp / maxTemp) * 100;
    return `${percentage}%`;
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: animatedBackgroundColor }]}>
      {/* Icône locale */}
      <Image
        source={require('../TemperatureScreen/temp.png')} // Ajuster le chemin de l'icône
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.label}>Température de l'eau</Text>

      {/* Jauge avec couleur et largeur dynamique */}
      <View style={styles.gaugeContainer}>
        <View
          style={[
            styles.gauge,
            {
              backgroundColor: getGaugeColorForTemperature(temperature),
              width: getGaugeWidth(temperature), // Ajuster la largeur selon la température
            },
          ]}
        />
      </View>

      <Text style={styles.value}>{temperature}°C</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 130,
    height: 200,
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    color: 'white',
  },
  gaugeContainer: {
    width: 200,
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  gauge: {
    height: '100%',
    borderRadius: 5,
  },
  value: {
    fontSize: 48,
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  regulatorLabel: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
});

export default TemperatureScreen;
