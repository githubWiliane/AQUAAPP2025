import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HistoricalDataScreen({ navigation }) {
  const [historicalData, setHistoricalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Récupère l'historique sauvegardé dans AsyncStorage
  const fetchHistoricalData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('historicalData');
      if (storedData !== null) {
        const data = JSON.parse(storedData);
        setHistoricalData(data);
        setFilteredData(data); // Par défaut, on affiche toutes les données
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique :", error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  // Filtre les données selon l'intervalle de dates choisi
  const filterData = () => {
    if (!startDate || !endDate) return;
    const filtered = historicalData.filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredData(filtered);
  };

  // Préparation des données pour le graphique
  const labels = filteredData.map(item => {
    const d = new Date(item.timestamp);
    const h = d.getHours();
    const m = d.getMinutes();
    return `${h}:${m < 10 ? '0' + m : m}`;
  });

  const temperatureData = filteredData.map(item => item.temperature);
  const humidityData = filteredData.map(item => item.humidity);
  const tempDS18B20Data = filteredData.map(item => item.tempDS18B20);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: temperatureData,
        // Couleur rouge, opacité 100%
        color: () => 'rgba(255, 99, 132, 1)',
        strokeWidth: 3,
        withDots: false,
      },
      {
        data: humidityData,
        // Couleur bleue, opacité 100%
        color: () => 'rgba(54, 162, 235, 1)',
        strokeWidth: 3,
        withDots: false,
      },
      {
        data: tempDS18B20Data,
        // Couleur jaune, opacité 100%
        color: () => 'rgba(255, 206, 86, 1)',
        strokeWidth: 3,
        withDots: false,
      },
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historique</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.dateButton} 
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {startDate ? `Début: ${startDate.toLocaleDateString()}` : "Sélectionner date début"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.dateButton} 
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {endDate ? `Fin: ${endDate.toLocaleDateString()}` : "Sélectionner date fin"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={filterData}
        >
          <Text style={styles.filterButtonText}>Filtrer</Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(Platform.OS === 'ios');
            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(Platform.OS === 'ios');
            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
      )}

      {filteredData.length === 0 ? (
        <Text style={styles.noDataText}>Aucune donnée pour cet intervalle.</Text>
      ) : (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={250}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            fillShadowGradient: 'transparent',
            fillShadowGradientOpacity: 0,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fond blanc
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
  },
  dateButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
  },
  filterButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
