import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function GraphiquesScreen() {
  const generateRandomData = () => ({
    temperature: Array.from({ length: 10 }, () => Math.floor(Math.random() * (34 - 30 + 1)) + 30),
    humidity: Array.from({ length: 10 }, () => Math.floor(Math.random() * (64 - 60 + 1)) + 60),
    tempDS18B20: Array.from({ length: 10 }, () => Math.floor(Math.random() * (33 - 30 + 1)) + 30),
  });

  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => `${i + 1}`), // X-axis labels
    datasets: [
      {
        data: data.temperature,
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Rouge pour la température
        strokeWidth: 2,
      },
      {
        data: data.humidity,
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Bleu pour l'humidité
        strokeWidth: 2,
      },
      {
        data: data.tempDS18B20,
        color: (opacity = 1) => `rgba(255, 206, 86, ${opacity})`, // Jaune pour la tempDS18B20
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
          propsForDots: {
            r: '4',
            strokeWidth: '1',
            stroke: '#000',
          },
        }}
      />

      <View style={styles.legendContainer}>
        <Text style={[styles.legend, { color: 'red' }]}>● Température</Text>
        <Text style={[styles.legend, { color: 'blue' }]}>● Humidité</Text>
        <Text style={[styles.legend, { color: 'orange' }]}>● Température DS18B20</Text>
      </View>
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
});

