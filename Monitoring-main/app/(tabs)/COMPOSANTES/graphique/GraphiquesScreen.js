import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

export default function GraphiquesScreen({ navigation }) {
  const ESP32_IP = "http://192.168.4.1";
  const [temperatureHistory, setTemperatureHistory] = useState([]);
  const [humidityHistory, setHumidityHistory] = useState([]);
  const [tempDS18B20History, setTempDS18B20History] = useState([]);

  const updateHistory = (history, newValue) => {
    const updated = [...history, newValue];
    return updated.length > 10 ? updated.slice(updated.length - 10) : updated;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(ESP32_IP);
      const sensorData = response.data;
      setTemperatureHistory(prev => updateHistory(prev, sensorData.temperature));
      setHumidityHistory(prev => updateHistory(prev, sensorData.humidity));
      setTempDS18B20History(prev => updateHistory(prev, sensorData.tempDS18B20));
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!temperatureHistory.length || !humidityHistory.length || !tempDS18B20History.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Chargement des données...</Text>
      </View>
    );
  }

  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        data: temperatureHistory,
        color: () => 'rgba(255, 99, 132, 1)', // Couleur rouge, opacité 100%
        strokeWidth: 3,
        withDots: false,
      },
      {
        data: humidityHistory,
        color: () => 'rgba(54, 162, 235, 1)', // Couleur bleue, opacité 100%
        strokeWidth: 3,
        withDots: false,
      },
      {
        data: tempDS18B20History,
        color: () => 'rgba(255, 206, 86, 1)', // Couleur jaune, opacité 100%
        strokeWidth: 3,
        withDots: false,
      },
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Évolution des données</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={250}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#FFF',
          backgroundGradientFrom: '#FFF',
          backgroundGradientTo: '#FFF',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          fillShadowGradient: 'transparent',      // Pas de remplissage sous les courbes
          fillShadowGradientOpacity: 0,           // Opacité à 0 pour le remplissage
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          backgroundColor: '#FFF',
        }}
      />
      <View style={styles.legendContainer}>
        <Text style={[styles.legend, { color: 'red' }]}>Température(Air)</Text>
        <Text style={[styles.legend, { color: 'blue' }]}>Humidité(Air)</Text>
        <Text style={[styles.legend, { color: 'orange' }]}>Température(Eau)</Text>
      </View>
      <TouchableOpacity 
        style={styles.historicButton} 
        onPress={() => navigation.navigate('HistoricalDataScreen')}
      >
        <Text style={styles.historicButtonText}>Voir l'historique</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fond blanc
    padding: 20,
  },
  header: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legend: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historicButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  historicButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
