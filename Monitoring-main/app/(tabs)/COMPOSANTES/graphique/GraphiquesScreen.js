import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GraphiquesScreen() {
   

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historique des Données</Text>
 
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#FF0000',  // Couleur rouge pour l'erreur
    fontSize: 18,
  },
});
