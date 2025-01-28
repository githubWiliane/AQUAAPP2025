import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Chapitre5Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Entretien Quotidien en Pisciculture</Text>

      {/* Image principale */}
      <Image
        source={require('../Chapitre5/c30.webp')} // Remplacez avec votre image principale
        style={styles.image}
      />

      {/* Section 1 : Introduction */}
      <Text style={styles.subtitle}>Introduction</Text>
      <Text style={styles.content}>
        L'entretien quotidien est une composante essentielle pour maintenir un environnement sain pour les poissons et optimiser leur croissance. 
        Un suivi rigoureux des conditions de l'eau, de l'alimentation et de l'état général des poissons permet de prévenir les problèmes 
        et d'assurer une production durable.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre5/image.jpeg')} // Remplacez avec une image pertinente
        style={styles.image}
      />

      {/* Section 2 : Vérification de la qualité de l'eau */}
      <Text style={styles.subtitle}>Vérification de la Qualité de l'Eau</Text>
      <Text style={styles.content}>
        Une bonne qualité de l'eau est cruciale pour la santé des poissons. Voici les paramètres à vérifier quotidiennement :
        {'\n'}- Température : Doit être adaptée à l'espèce (ex : 20-30°C pour les poissons tropicaux).
        {'\n'}- pH : Doit être stable (6,5 à 8,5 pour la plupart des espèces).
        {'\n'}- Oxygène Dissous : Assurez-vous que les niveaux sont suffisants pour éviter le stress des poissons.
        {'\n'}- Turbidité : L'eau doit être claire pour éviter les maladies et le stress.
        Utilisez des kits de test pour mesurer ces paramètres et ajustez en conséquence.
      </Text>

      {/* Image illustrative */} 
      <Image
        source={require('../Chapitre5/tilapia.webp')} // Remplacez avec une image montrant la vérification de l'eau
        style={styles.image}
      />

      {/* Section 3 : Alimentation quotidienne */}
      <Text style={styles.subtitle}>Alimentation Quotidienne</Text>
      <Text style={styles.content}>
        Une alimentation équilibrée est essentielle pour la croissance et la santé des poissons. Voici les règles principales :
        {'\n'}- Distribuez les aliments à des heures fixes pour créer une routine.
        {'\n'}- Évitez le sur-nourrissage, qui peut polluer l'eau et nuire à la santé des poissons.
        {'\n'}- Vérifiez que tous les poissons ont accès à la nourriture et observez leur comportement.
        {'\n'}- Retirez les aliments non consommés après 20-30 minutes pour éviter la décomposition dans l'eau.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre5/image (1).jpeg')} // Remplacez avec une image illustrant l'alimentation
        style={styles.image}
      />

      {/* Section 4 : Observation des poissons */}
      <Text style={styles.subtitle}>Observation des Poissons</Text>
      <Text style={styles.content}>
        Observez vos poissons quotidiennement pour détecter rapidement tout signe de maladie ou de stress :
        {'\n'}- Regardez leur comportement : nage normale, respiration, alimentation.
        {'\n'}- Vérifiez leur apparence : nageoires intactes, pas de taches anormales ou de gonflements.
        {'\n'}- Isolez immédiatement les poissons présentant des symptômes inhabituels pour éviter la contamination.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre5/production-nationale-du-tilapia-delevage-une-delegation-de-la-fao-et-du-min_h7uhl0hn5dl.jpg')} // Remplacez avec une image montrant l'observation des poissons
        style={styles.image}
      />

      {/* Section 5 : Nettoyage et Maintenance */}
      <Text style={styles.subtitle}>Nettoyage et Maintenance</Text>
      <Text style={styles.content}>
        Le nettoyage régulier des installations est indispensable pour prévenir les problèmes de santé :
        {'\n'}- Filtres : Vérifiez et nettoyez les filtres pour éviter l'accumulation de déchets.
        {'\n'}- Fond du bassin : Aspirez les débris et les restes de nourriture.
        {'\n'}- Parois du bassin : Éliminez les algues ou autres accumulations pour maintenir un environnement propre.
        {'\n'}- Équipements : Nettoyez les équipements tels que les filets, les bacs, et les pompes.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre5/unnamed.jpg')} // Remplacez avec une image montrant le nettoyage
        style={styles.image}
      />

      {/* Section 6 : Vérification du Système d'Aération */}
      <Text style={styles.subtitle}>Vérification du Système d'Aération</Text>
      <Text style={styles.content}>
        Assurez-vous que les systèmes d'aération fonctionnent correctement pour maintenir des niveaux adéquats d'oxygène dissous. 
        Vérifiez :
        {'\n'}- Le bon fonctionnement des pompes et des diffuseurs.
        {'\n'}- L'absence de blocages ou de pannes.
        {'\n'}- La circulation uniforme de l'eau dans tout le bassin.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre5/Pisciculture.jpg')} // Remplacez avec une image montrant un système d'aération
        style={styles.image}
      />

      {/* Section 7 : Planification et Suivi */}
      <Text style={styles.subtitle}>Planification et Suivi</Text>
      <Text style={styles.content}>
        Tenez un journal d'entretien pour suivre vos activités quotidiennes :
        {'\n'}- Notez les paramètres de l'eau (température, pH, oxygène, etc.).
        {'\n'}- Enregistrez les quantités d'aliments distribuées.
        {'\n'}- Suivez l'état de santé des poissons.
        {'\n'}- Planifiez les maintenances hebdomadaires ou mensuelles pour éviter les oublis.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre5/production-nationale-du-tilapia-delevage-une-delegation-de-la-fao-et-du-min_h7uhl0hn5dl.jpg')} // Remplacez avec une image montrant un journal ou un suivi
        style={styles.image}
      />

      {/* Conclusion */}
      <Text style={styles.content}>
        Un entretien quotidien rigoureux est la clé pour réussir en pisciculture. En surveillant régulièrement les paramètres 
        de l'eau, en observant les poissons, et en maintenant les installations propres, {'\n'}vous pouvez prévenir les problèmes et 
        optimiser la production.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007ACC',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#005f8f',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
});
