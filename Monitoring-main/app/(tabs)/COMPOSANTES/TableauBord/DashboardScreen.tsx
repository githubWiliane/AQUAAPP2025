import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, Switch, ScrollView, RefreshControl } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TableauDebord({ navigation }) {
  const [data, setData] = useState({ temperature: null, humidity: null, tempDS18B20: null ,aeratorState : false});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [aeratorState, setAeratorState] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const ESP32_IP = "http://192.168.4.1";

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ESP32_IP}`);
      setData(response.data);
      setAeratorState(response.data.aeratorState);


      console.log(aeratorState);
      
      setLoading(false);
      setConnected(true);
    } catch (err) {
      setError("Impossible de récupérer les données.");
      setLoading(false);
      setConnected(false);
    }
  };

  const toggleAerator = async () => {
    try {
      const newAeratorState = !aeratorState;
      setAeratorState(newAeratorState);
      await axios.post(`${ESP32_IP}/toggle-aerator`, { aeratorState: newAeratorState });
    } catch (err) {
      setError("Impossible de changer l'état de l'aérateur.");
    }
  };

  const onRefresh = async () => {
    if (!refreshing) {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
    }
  };

  const [pressure, setPressure] = useState(getRandomPressure());

  function getRandomPressure() {
    return Math.floor(Math.random() * (1020 - 1013 + 1)) + 1013;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPressure(getRandomPressure());
    }, 1000); // Change toutes les secondes

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkTheme(JSON.parse(savedTheme));
      }
    };
    loadTheme();
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const saveTheme = async (theme) => {
    setIsDarkTheme(theme);
    await AsyncStorage.setItem('theme', JSON.stringify(theme));
  };

  const themeStyles = isDarkTheme ? styles.dark : styles.light;
  const progressColor = isDarkTheme ? '#fff' : '#000';
  const iconColor = isDarkTheme ? '#fff' : '#000';
  const separatorColor = isDarkTheme ? '#fff' : '#000';
  const spinnerColor = isDarkTheme ? '#fff' : '#000';

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* Tableau de bord */}
      <View style={styles.header}>
        <Text style={themeStyles.headerText}>TABLEAU DE BORD</Text>
      </View>

      {/* ScrollView avec RefreshControl pour le rafraîchissement */}
      <ScrollView
        contentContainerStyle={styles.grid}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.parameter}>
          <CircularProgress 
            value={data.tempDS18B20} 
            radius={70} 
            progressValueColor={progressColor} 
            duration={1000} 
            valueSuffix="°C" 
            progressColor={progressColor} 
          />
          <Text style={themeStyles.label}>T° de l'Eau</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress 
            value={data.temperature} 
            radius={70} 
            progressValueColor={progressColor} 
            duration={1000} 
            valueSuffix="°C" 
            progressColor={progressColor} 
          />
          <Text style={themeStyles.label}>T° de l'Air</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress 
            value={data.humidity} 
            radius={70} 
            progressValueColor={progressColor} 
            duration={1000} 
            valueSuffix="%" 
            progressColor={progressColor} 
          />
          <Text style={themeStyles.label}>Humidité (Air)</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress 
            value={pressure} 
            radius={70} 
            progressValueColor={progressColor} 
            duration={1000} 
            valueSuffix="" 
            progressColor={progressColor} 
          />
          <Text style={themeStyles.label}>Pression Atm(hpa)</Text>
        </View>
      </ScrollView>

      {/* Affichage de l'état de l'aérateur */}
      <View style={styles.aeratorStatusContainer}>
        <Text style={themeStyles.label}>État de l'Aérateur</Text>
        <View style={styles.aeratorControl}>
          <Image
            source={aeratorState == true ?  require('../led/led2.png') : require('../led/led1.png')}
            style={styles.ledImage}
          />
          {/* <Switch
            value={aeratorState}
            onValueChange={toggleAerator}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={aeratorState ? '#f5dd4b' : '#f4f3f4'}
          /> */}
        </View>
      </View>

      {/* Barre séparatrice */}
      <View style={[styles.iconSeparator, { backgroundColor: separatorColor }]} />

      {/* Alignement des icônes */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Alimentation')}>
          <Image 
            source={require('../AlimentationScreen/ALIMENTATION.png')} 
            style={[styles.iconAlimentation, { tintColor: iconColor }]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Graphiques')}>
          <Icon name="bar-chart" size={60} color={iconColor} style={styles.iconGraphique} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Tuto')}>
    <Icon name="book" size={60} color={iconColor} style={styles.iconTutoriel} />
        </TouchableOpacity>

      </View>

      {/* Messages */}
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={spinnerColor} style={styles.spinner} />
          <Text style={themeStyles.loadingText}>En attente des données...</Text>
        </View>
      )}

      {error && (
        <View style={styles.loadingContainer}>
          <Text style={themeStyles.loadingText}>{error}</Text>
        </View>
      )}

      {connected && !loading && !error && (
        <View style={styles.connectionContainer}>
          <Text style={themeStyles.connectionText}>Connexion rétablie !</Text>
        </View>
      )}

      {/* Bouton pour changer le thème */}
      <View style={styles.themeButtonContainer}>
        <TouchableOpacity onPress={() => saveTheme(!isDarkTheme)}>
          <Icon 
            name={isDarkTheme ? 'sunny' : 'moon'} 
            size={30} 
            color={isDarkTheme ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  parameter: {
    alignItems: 'center',
    margin: 10,
    width: '40%',
    padding: 0,
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  iconSeparator: {
    height: 1.5,
    marginHorizontal: 20,
    marginBottom: 2,
    marginTop: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Répartit uniformément les icônes avec de l'espace
    alignItems: 'center',           // Centre les icônes verticalement
    marginTop: 20,
  },
  iconGraphique: {
    marginLeft: 20,
    right:8,
  },
  iconTutoriel: {
    width: 70,
    height: 70,
    //resizeMode: 'contain',
    top:10,
    left:20,
  },
  iconAlimentation: {
    width: 70, 
    height: 70, 
    resizeMode: 'contain', 
    marginRight: 20, 
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  spinner: {
    marginRight: 10, 
  },
  loadingText: {
    fontSize: 18,
    marginLeft: 10, 
  },
  connectionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  connectionText: {
    fontSize: 18,
    color: '#00FF00',
  },
  themeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  light: {
    container: {
      backgroundColor: '#fff',
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    label: {
      color: '#000',
    },
    loadingText: {
      color: '#000',
    },
    connectionText: {
      color: '#000',
    },
  },
  dark: {
    container: {
      backgroundColor: '#121212',
    },
    headerText: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    label: {
      color: '#fff',
    },
    loadingText: {
      color: '#fff',
    },
    connectionText: {
      color: '#00FF00',
    },
  },
  aeratorStatusContainer: {
    alignItems: 'center',
    marginVertical: -3,
  },
  ledImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 0,
  },
  aeratorControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '50%'
  },
});
