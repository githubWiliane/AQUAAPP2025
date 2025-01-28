import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';

const EnrgieScreen = () => {
  const [isRegulatorOn, setIsRegulatorOn] = useState(false);
  const temperature = 10; // Valeur de température (à remplacer par votre capteur)

  const toggleSwitch = () => setIsRegulatorOn(previousState => !previousState);

  // Déterminer la couleur de la jauge en fonction de la valeur de la température
  const getColorForTemperature = (temp) => {
    if (temp < 15) return 'red';
    if (temp < 25) return 'yellow';
    return 'green';
  };

  // Calculer la largeur de la jauge en fonction de la température
  const getGaugeWidth = (temp) => {
    const minTemp = 0;  // Température minimale (par exemple)
    const maxTemp = 50; // Température maximale possible (à adapter)
    const normalizedTemp = Math.max(minTemp, Math.min(temp, maxTemp)); // Limite entre min et max
    const percentage = (normalizedTemp / maxTemp) * 100; // Convertir en pourcentage
    return `${percentage}%`; // Retourner la largeur en pourcentage
  };

  return (
    <View style={styles.container}>
      {/* Ajout de l'icône locale */}
      <Image
        source={require('../EnergieScreen/ENERGIE.png')} // Chemin relatif à votre icône locale
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.label}>Pourcentage de la batterie</Text>

      {/* Jauge avec couleur et largeur dynamique */}
      <View style={styles.gaugeContainer}>
        <View
          style={[
            styles.gauge,
            {
              backgroundColor: getColorForTemperature(temperature),
              width: getGaugeWidth(temperature), // Ajuste la largeur selon la température
            },
          ]}
        />
      </View>

      <Text style={styles.value}>{temperature}%</Text>

       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004d4d',
  },
  icon: {
    width: 210,
    height: 200,
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    color: 'white',
  },
  gaugeContainer: {
    width: 200, // Largeur totale de la jauge
    height: 10,
    backgroundColor: '#ccc', // Couleur de fond de la jauge (inactif)
    borderRadius: 5,
    overflow: 'hidden', // Pour éviter que l'indicateur dépasse
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

export default EnrgieScreen;
