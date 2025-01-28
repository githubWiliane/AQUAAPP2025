import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Chapitre3Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Nutrition des Poissons</Text>

      {/* Image principale */}
      <Image
        source={require('../Chapitre3/a-Feeding-broostock-tilapia.jpg')} // Remplacez avec votre image
        style={styles.image}
      />

      {/* Section 1 : L'importance de la nutrition pour les poissons */}
      <Text style={styles.subtitle}>L'importance de la nutrition pour les poissons</Text>
      <Text style={styles.content}>
        Une nutrition adéquate est essentielle pour le bien-être et la croissance des poissons. Une alimentation mal équilibrée 
        peut entraîner des retards de croissance, des maladies, et une faible reproduction. Les poissons ont besoin de protéines, 
        de lipides, de glucides, de vitamines, et de minéraux pour maintenir leur santé et leur productivité.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre3/deheus-fishfutter-597x448-1.webp')} // Image supplémentaire
        style={styles.image}
      />

      {/* Section 2 : Types d'aliments pour les poissons */}
      <Text style={styles.subtitle}>Types d'aliments pour les poissons</Text>
      <Text style={styles.content}>
        Les poissons peuvent être nourris avec différents types d'aliments en fonction de leurs besoins :
    {'\n'}- Aliments commerciaux : Des granulés ou des flocons préparés, équilibrés en nutriments spécifiques.
    {'\n'}- Aliments naturels : Insectes, vers, et autres aliments vivants ou congelés, souvent utilisés pour les poissons carnivores.
    {'\n'}- Aliments faits maison : Mélanges faits maison à base de poisson, de légumes et de compléments alimentaires.
      </Text>

      {/* Image illustrative : Aliments pour poissons */}
      <Image
        source={require('../Chapitre3/2024011609593823734.webp')} // Remplacez avec votre image des types d'aliments
        style={styles.image}
      />

      {/* Section 3 : Les besoins nutritionnels spécifiques */}
      <Text style={styles.subtitle}>Les besoins nutritionnels spécifiques</Text>
      <Text style={styles.content}>
        Chaque espèce de poisson a des besoins nutritionnels spécifiques :
        {'\n'}- Les poissons carnivores : Besoin de plus de protéines animales pour leur développement.
        {'\n'}- Les poissons herbivores : Besoin de plus de végétaux pour leur alimentation.
        {'\n'}- Les poissons omnivores : Peuvent consommer une combinaison de protéines animales et végétales.
        Il est crucial d'adapter l'alimentation aux espèces élevées pour garantir une croissance optimale et éviter des déséquilibres nutritionnels.
      </Text>

      {/* Image illustrative : Poisson carnivore vs herbivore */}
      <Image
        source={require('../Chapitre3/macronutriments-repartition-musculation.png')} // Remplacez avec votre image comparant les types de poissons
        style={styles.imagespec}
      />

      {/* Section 4 : Fréquence et quantité de l'alimentation */}
      <Text style={styles.subtitle}>Fréquence et quantité de l'alimentation</Text>
      <Text style={styles.content}>
        La fréquence et la quantité des repas dépendent de plusieurs facteurs : la taille des poissons, leur espèce, et la température 
        de l'eau. {'\n'}En général :
    {'\n'}- Les poissons jeunes doivent être nourris plus souvent (2 à 3 fois par jour).
    {'\n'}- Les poissons adultes peuvent être nourris 1 à 2 fois par jour.
        Il est important de ne pas suralimenter les poissons, car cela peut polluer l'eau et causer des problèmes de santé.
      </Text>

      {/* Image illustrative : Nourrir les poissons */}
      <Image
        source={require('../Chapitre3/comment-bien-nourrir-les-poissons-de-bassin-3.jpg')} // Remplacez avec votre image de nourrissage des poissons
        style={styles.image}
      />

      {/* Section 5 : Compléments alimentaires */}
      <Text style={styles.subtitle}>Compléments alimentaires</Text>
      <Text style={styles.content}>
        Les compléments alimentaires peuvent être utilisés pour améliorer la croissance et la santé des poissons. Certains compléments 
        sont spécialement formulés pour améliorer la couleur, la reproduction, ou la résistance aux maladies. Les compléments peuvent inclure :
    {'\n'}- Vitamines et minéraux : Pour renforcer le système immunitaire et prévenir les carences.
    {'\n'}- Acides gras oméga-3 : Pour favoriser la croissance et améliorer la qualité de la chair.
      </Text>

      {/* Image illustrative : Compléments alimentaires */}
      <Image
        source={require('../Chapitre3/depositphotos_25254941-stock-photo-feeding-fish.jpg')} // Remplacez avec votre image de compléments alimentaires
        style={styles.image}
      />

      {/* Section 6 : Problèmes liés à une mauvaise alimentation */}
      <Text style={styles.subtitle}>Problèmes liés à une mauvaise alimentation</Text>
      <Text style={styles.content}>
        Une mauvaise alimentation peut entraîner divers problèmes chez les poissons :
  {'\n'}- Retards de croissance : Des poissons qui ne reçoivent pas suffisamment de nutriments.
  {'\n'}- Maladies : Une alimentation inappropriée peut rendre les poissons plus vulnérables aux infections.
  {'\n'}- Comportements anormaux : Les poissons peuvent devenir plus agressifs ou moins actifs en raison de la malnutrition.
      </Text>

      {/* Image illustrative : Poisson malade */}
      <Image
        source={require('../Chapitre3/depositphotos_34254993-stock-photo-feeding-to-many-koi-fish.jpg')} // Remplacez avec une image de poisson malade
        style={styles.image}
      />

      {/* Conclusion */}
      <Text style={styles.content}>
        La nutrition est un facteur clé pour la réussite de la pisciculture. Une alimentation équilibrée et adaptée à chaque espèce garantit 
        une croissance saine, {'\n'}une reproduction efficace et des poissons en bonne santé.
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

  imagespec: {
    width: 250, // Réduit la largeur
    height: 250, // Réduit la hauteur
    resizeMode: 'contain', // Assure que l'image garde ses proportions
    borderRadius: 8, // Coins légèrement arrondis
    marginBottom: 10, // Espace sous l'image
    left:55,
  },
});
