import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const PressionAtmScreen = () => {
  const [isRegulatorOn, setIsRegulatorOn] = useState(false);
  const [oxygenLevel, setOxygenLevel] = useState(2); // Valeur initiale d'OD
  const backgroundColorAnim = new Animated.Value(0); // Valeur initiale pour l'animation

  const toggleSwitch = () => setIsRegulatorOn((previousState) => !previousState);

  // Déterminer la couleur de la jauge en fonction de l'OD
  const getGaugeColorForOxygenLevel = (level) => {
    if (level < 3) return '#FF6666'; // Rouge pour OD < 3
    if (level >= 3 && level < 5) return '#FFD700'; // Jaune pour OD entre 3 et 5
    if (level >= 5 && level <= 10) return '#90EE90'; // Vert pour OD entre 5 et 10
    return '#87CEEB'; // Bleu pour OD > 10
  };

  // Effet pour mettre à jour l'animation de l'arrière-plan à chaque changement d'OD
  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: oxygenLevel, // Utiliser l'OD comme valeur pour l'animation
      duration: 1000, // Durée de la transition en millisecondes
      useNativeDriver: false,
    }).start();
  }, [oxygenLevel]);

  // Calculer la couleur de fond en fonction de l'OD avec une transition progressive
  const animatedBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 3, 5, 10, 15],
    outputRange: ['#660000', '#8B4500', '#556B2F', '#004d00', '#4682B4'], // Rouge foncé, jaune foncé, vert foncé, bleu pour chaque intervalle
  });

  // Calculer la largeur de la jauge en fonction de l'OD
  const getGaugeWidth = (level) => {
    const minLevel = 0;
    const maxLevel = 15;
    const normalizedLevel = Math.max(minLevel, Math.min(level, maxLevel));
    const percentage = (normalizedLevel / maxLevel) * 100;
    return `${percentage}%`;
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: animatedBackgroundColor }]}>
      {/* Icône locale */}
      <Image
        source={require('../PressionAtmospherique/pressionAtm.png')} // Ajuster le chemin de l'icône
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.label}>Pression atmosphérique</Text>

      {/* Jauge avec couleur et largeur dynamique */}
      <View style={styles.gaugeContainer}>
        <View
          style={[
            styles.gauge,
            {
              backgroundColor: getGaugeColorForOxygenLevel(oxygenLevel),
              width: getGaugeWidth(oxygenLevel), // Ajuster la largeur selon l'OD
            },
          ]}
        />
      </View>

      <Text style={styles.value}>{oxygenLevel} hPa</Text>
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
    width: 230,
    height: 200,
    marginBottom: 20,
    tintColor: 'white',
    
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

export default PressionAtmScreen;
