import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Chapitre6Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Maladies Courantes des Poissons</Text>

      {/* Image principale */}
      <Image
        source={require('../Chapitre6/image.jpg')} // Remplacez avec votre image principale
        style={styles.image}
      />

      {/* Section 1 : Introduction */}
      <Text style={styles.subtitle}>Introduction</Text>
      <Text style={styles.content}>
        Les maladies des poissons peuvent avoir un impact négatif sur la croissance, la reproduction et la survie des poissons dans un élevage. 
        Elles sont généralement causées par des agents pathogènes, des parasites, ou des conditions environnementales défavorables.
        La compréhension des maladies courantes est essentielle pour minimiser les pertes et maintenir une pisciculture saine.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre6/Ombre-commun-AC-Monnier-1-725x483.jpg')} // Remplacez avec une image pertinente
        style={styles.image}
      />

      {/* Section 2 : Causes des maladies */}
      <Text style={styles.subtitle}>Causes des Maladies</Text>
      <Text style={styles.content}>
        Les maladies chez les poissons peuvent être causées par plusieurs facteurs :
        {'\n'}- Agents pathogènes : Bactéries, virus, champignons, et parasites.
        {'\n'}- Conditions environnementales : Température inadaptée, mauvaise qualité de l'eau (ammoniac, nitrites), manque d'oxygène.
        {'\n'}- Stress : Surpopulation, changements soudains des conditions de l'eau, manipulations excessives.
        {'\n'}- Carences nutritionnelles : Une alimentation déséquilibrée peut affaiblir le système immunitaire des poissons.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre6/Equipements-truite-arc-en-ciel.jpg')} // Remplacez avec une image illustrant les causes
        style={styles.image}
      />

      {/* Section 3 : Symptômes courants */}
      <Text style={styles.subtitle}>Symptômes Courants</Text>
      <Text style={styles.content}>
        Voici quelques symptômes courants de maladies chez les poissons :
        {'\n'}- Comportement anormal : Nage erratique, poissons qui restent au fond ou en surface.
        {'\n'}- Apparence physique : Nageoires effilochées, corps couvert de taches blanches ou rouges, yeux gonflés.
        {'\n'}- Perte d'appétit : Refus de manger ou diminution de l'activité alimentaire.
        {'\n'}- Respiration rapide : Signes de manque d'oxygène ou de stress respiratoire.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre6/truite-arc-en-ciel-062001-650-400.jpg')} // Remplacez avec une image des symptômes
        style={styles.image}
      />

      {/* Section 4 : Maladies courantes et traitements */}
      <Text style={styles.subtitle}>Maladies Courantes et Traitements</Text>
      <Text style={styles.content}>
        1. Ichthyophthirius (Maladie des points blancs) :
        {'\n'}- Symptômes : Points blancs sur le corps et les nageoires, frottement contre les objets.
        {'\n'}- Cause : Parasite Ichthyophthirius multifiliis.
        {'\n'}- Traitement : Utilisation de sel de table non iodé ou de traitements commerciaux à base de formol ou de cuivre.
        {'\n\n'}
        2. Pourriture des nageoires :
        {'\n'}- Symptômes : Nageoires effilochées ou pourries, bordures blanchâtres.
        {'\n'}- Cause : Infection bactérienne.
        {'\n'}- Traitement : Antibiotiques spécifiques et amélioration de la qualité de l'eau.
        {'\n\n'}
        3. Hydropisie :
        {'\n'}- Symptômes : Abdomen gonflé, écailles hérissées.
        {'\n'}- Cause : Infection bactérienne interne.
        {'\n'}- Traitement : Antibiotiques dans la nourriture et isolement des poissons infectés.
        {'\n\n'}
        4. Mycose :
        {'\n'}- Symptômes : Taches blanches cotonneuses sur le corps ou les nageoires.
        {'\n'}- Cause : Champignons (Saprolegnia).
        {'\n'}- Traitement : Bains antifongiques ou produits commerciaux.
        {'\n\n'}
        5. Vers intestinaux :
        {'\n'}- Symptômes : Amaigrissement malgré une alimentation normale, excréments filamenteux.
        {'\n'}- Cause : Parasites internes.
        {'\n'}- Traitement : Antiparasitaires spécifiques dans la nourriture.
      </Text>

      {/* Image illustrative : Maladies courantes */}
      <Image
        source={require('../Chapitre6/158906.jpg')} // Remplacez avec une image des maladies courantes
        style={styles.image}
      />

      {/* Section 5 : Prévention des maladies */}
      <Text style={styles.subtitle}>Prévention des Maladies</Text>
      <Text style={styles.content}>
        La prévention est la clé pour éviter les maladies dans un élevage de poissons :
        {'\n'}- Maintenir une bonne qualité de l'eau : Effectuer des changements d'eau réguliers et surveiller les paramètres.
        {'\n'}- Éviter la surpopulation : Donner suffisamment d'espace aux poissons.
        {'\n'}- Fournir une alimentation équilibrée pour renforcer le système immunitaire.
        {'\n'}- Quarantaine : Isoler les nouveaux poissons ou les poissons malades avant de les introduire dans l'étang principal.
        {'\n'}- Nettoyage régulier des équipements et des réservoirs pour éviter l'accumulation de pathogènes.
      </Text>

      {/* Image illustrative : Prévention */}
      <Image
        source={require('../Chapitre6/Equipements-truite-arc-en-ciel.jpg')} // Remplacez avec une image de prévention
        style={styles.image}
      />

      {/* Conclusion */}
      <Text style={styles.content}>
        La gestion des maladies des poissons est essentielle pour assurer le succès de la pisciculture. En reconnaissant les symptômes rapidement 
        et en prenant des mesures préventives, il est possible de minimiser les pertes et de maintenir une population de poissons saine.
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
