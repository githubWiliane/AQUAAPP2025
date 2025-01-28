import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Chapitre2Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Qualité de l'eau</Text>

      {/* Image principale */}
      <Image
        source={require('../Chapitre2/qualiter.jpg')} // Remplacez avec votre image
        style={styles.image}
      />

      {/* Section 1 : Pourquoi la qualité de l'eau est-elle cruciale ? */}
      <Text style={styles.subtitle}>Pourquoi la qualité de l'eau est-elle cruciale ?</Text>
      <Text style={styles.content}>
        La qualité de l'eau est l'un des facteurs les plus importants dans la pisciculture. Un environnement aquatique sain 
        est essentiel pour la croissance, la reproduction et la santé des poissons. {'\n'}Une mauvaise qualité de l'eau peut entraîner 
        des maladies, des retards de croissance, voire la mortalité des poissons.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../Chapitre2/shading-success-exploring-innovations-in-the-aquaculture-shade-net-market.jpg')} // Image supplémentaire
        style={styles.image}
      />

      {/* Section 2 : Le cycle de l'eau dans un système piscicole */}
      <Text style={styles.subtitle}>Le cycle de l'eau dans un système piscicole</Text>
      <Text style={styles.content}>
        L'eau dans un bassin de pisciculture suit un cycle constant. Ce cycle implique l'aération, la filtration, et l'échange 
        d'oxygène et de CO2. {'\n'}L'eau entre dans le système, elle est filtrée pour éliminer les impuretés, puis l'oxygène est ajouté 
        pour maintenir un environnement sain pour les poissons. L'eau doit être régulièrement renouvelée pour maintenir sa qualité.
      </Text>
      {/* Image illustrative : Cycle de l'eau */}
      <Image
        source={require('../Chapitre2/Pisciculture en milieu naturel.png')} // Remplacez avec votre image du cycle de l'eau
        style={styles.image}
      />

      {/* Section 3 : Les systèmes de filtration d'eau */}
      <Text style={styles.subtitle}>Les systèmes de filtration d'eau</Text>
      <Text style={styles.content}>
        Il existe plusieurs types de systèmes de filtration dans la pisciculture :
      {'\n'}- Filtration mécanique : Enlève les particules solides de l'eau, comme les débris et les déchets.
      {'\n'}- Filtration biologique : Utilise des bactéries pour décomposer les matières organiques et les déchets produits par les poissons.
      {'\n'}- Filtration chimique : Élimine les contaminants chimiques, comme les métaux lourds et les produits chimiques toxiques.
      </Text>
      {/* Image illustrative : Système de filtration */}
      <Image
        source={require('../Chapitre2/poisson-aquaculture-0077-1366x697.jpg')} // Remplacez avec votre image du système de filtration
        style={styles.image}
      />

      {/* Section 4 : La gestion de l'oxygène dissous */}
      <Text style={styles.subtitle}>La gestion de l'oxygène dissous</Text>
      <Text style={styles.content}>
        L'oxygène dissous est essentiel pour les poissons. Si l'oxygène est insuffisant, cela peut entraîner la suffocation et la 
        mort des poissons.{'\n'} Il existe différentes façons de gérer l'oxygène dissous dans un bassin :
    {'\n'}- Utiliser des aérateurs pour augmenter le niveau d'oxygène.
    {'\n'}- Installer des systèmes de circulation d'eau pour assurer un bon échange de gaz.
    {'\n'}- Surveiller régulièrement les niveaux d'oxygène dissous à l'aide de capteurs.
      </Text>
      {/* Image illustrative : Aérateur */}
      <Image
        source={require('../Chapitre2/Bassins_de_la_pisciculture_de_la_Calonne.jpg')} // Remplacez avec votre image d'un aérateur
        style={styles.image}
      />

      {/* Section 5 : La surveillance des paramètres de l'eau */}
      <Text style={styles.subtitle}>La surveillance des paramètres de l'eau</Text>
      <Text style={styles.content}>
        Pour maintenir une qualité d'eau optimale, il est crucial de surveiller plusieurs paramètres :
    {'\n'}- pH : Le pH doit être équilibré pour éviter le stress des poissons.
    {'\n'}- Température : La température de l'eau influence le métabolisme des poissons.
    {'\n'}- Ammoniaque et nitrites : Ces substances peuvent être toxiques pour les poissons à des niveaux élevés.
        Des tests réguliers doivent être effectués pour garantir la stabilité de ces paramètres.
      </Text>
      {/* Image illustrative : Test de l'eau */}
      <Image
        source={require('../Chapitre2/ouvrier_aquaculture.jpg')} // Remplacez avec votre image de kit de test de l'eau
        style={styles.image}
      />

      {/* Section 6 : Les erreurs courantes dans la gestion de l'eau */}
      <Text style={styles.subtitle}>Les erreurs courantes dans la gestion de l'eau</Text>
      <Text style={styles.content}>
        Certaines erreurs peuvent compromettre la qualité de l'eau :
    {'\n'}- Ne pas surveiller les niveaux d'oxygène dissous.
    {'\n'}- Négliger les changements d'eau réguliers.
    {'\n'}- Ignorer les niveaux de contaminants.
    {'\n'}- Utiliser des produits chimiques inappropriés pour le traitement de l'eau.
        Ces erreurs peuvent entraîner des pertes importantes de poissons ou une faible productivité.
      </Text>
      {/* Image illustrative : Poissons malades */}
      <Image
        source={require('../Chapitre2/pisculture.webp')} // Remplacez avec une image de poissons malades
        style={styles.image}
      />

      {/* Conclusion */}
      <Text style={styles.content}>
        La gestion de la qualité de l'eau est essentielle pour garantir un environnement sain pour vos poissons. En surveillant les 
        paramètres clés et en utilisant les bonnes pratiques, vous pouvez éviter de nombreux problèmes et assurer une pisciculture réussie.
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
