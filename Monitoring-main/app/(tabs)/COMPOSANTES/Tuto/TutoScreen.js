import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TutoScreen() {
  const navigation = useNavigation();

  const tutorials = [
    { id: 1, title: 'Introduction à la pisciculture', description: 'Découvrez les bases de la pisciculture.', screen: 'Chapitre1Screen' },
    { id: 2, title: 'Gestion de l’eau', description: 'Apprenez à maintenir une eau de qualité pour vos poissons.', screen: 'Chapitre2Screen' },
    { id: 3, title: 'Nutrition des poissons', description: 'Tout sur l’alimentation des poissons pour une croissance optimale.', screen: 'Chapitre3Screen' },
    { id: 4, title: 'Type de poisson en pisciculture', description: 'Prévenez et traitez les maladies chez vos poissons.', screen: 'Chapitre4Screen' },
    { id: 5, title: 'Entretien quotidien en pisciculture', description: 'Maximisez vos profits grâce à une gestion efficace.', screen: 'Chapitre5Screen' },
    { id: 6, title: 'Maladies courantes', description: 'Prévenez et traitez les maladies chez vos poissons.', screen: 'Chapitre6Screen' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Bienvenue dans le tutoriel de pisciculture !</Text>

      {tutorials.map((tutorial) => (
        <TouchableOpacity
          key={tutorial.id}
          style={styles.card}
          onPress={() => navigation.navigate(tutorial.screen)} // Navigation vers l'écran correspondant
        >
          <Text style={styles.cardTitle}>{tutorial.title}</Text>
          <Text style={styles.cardDescription}>{tutorial.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#007ACC',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#f0f8ff',
  },
});
