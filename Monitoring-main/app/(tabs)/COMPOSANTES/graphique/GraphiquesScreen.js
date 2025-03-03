import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: humidityHistory,
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: tempDS18B20History,
        color: (opacity = 1) => `rgba(255, 206, 86, ${opacity})`,
        strokeWidth: 2,
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
          backgroundColor: '#F5F5F5',
          backgroundGradientFrom: '#F5F5F5',
          backgroundGradientTo: '#F5F5F5',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
      <View style={styles.legendContainer}>
        <Text style={[styles.legend, { color: 'red' }]}>Température</Text>
        <Text style={[styles.legend, { color: 'blue' }]}>Humidité</Text>
        <Text style={[styles.legend, { color: 'orange' }]}>Temp DS18B20</Text>
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
    backgroundColor: '#F5F5F5',
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
