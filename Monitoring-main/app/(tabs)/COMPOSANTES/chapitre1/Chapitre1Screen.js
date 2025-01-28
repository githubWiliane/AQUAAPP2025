import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Chapitre1Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Introduction à la Pisciculture</Text>

      {/* Image principale */}
      <Image
        source={require('../chapitre1/pisciculture.jpg')} // Remplacez avec votre image
        style={styles.image}
      />

      {/* Section 1 : Qu'est-ce que la pisciculture ? */}
      <Text style={styles.subtitle}>Qu'est-ce que la pisciculture ?</Text>
      <Text style={styles.content}>
        La pisciculture est l’élevage de poissons dans un environnement contrôlé, comme des bassins, des étangs ou des cages en mer. 
        Elle vise à produire du poisson pour la consommation, le repeuplement ou d'autres usages commerciaux. 
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../chapitre1/Bénin_Béninclusif_Pisciculture 2-3809x2538.jpg')} // Image supplémentaire
        style={styles.image}
      />

      {/* Section 2 : Pourquoi est-ce important ? */}
      <Text style={styles.subtitle}>Pourquoi est-ce important ?</Text>
      <Text style={styles.content}>
        Avec la surpêche et la diminution des stocks naturels de poissons, la pisciculture est devenue essentielle pour répondre à la 
        demande mondiale tout en protégeant les écosystèmes marins. 
      </Text>
      <Text style={styles.content}>
        Elle joue également un rôle crucial dans la sécurité alimentaire, offrant une source de protéines bon marché et accessible 
        pour de nombreuses populations dans le monde.
      </Text>

      {/* Section 3 : Les avantages de la pisciculture */}
      <Text style={styles.subtitle}>Les avantages de la pisciculture</Text>
      <Text style={styles.content}>
      {'\n'} - Production durable de poissons pour la consommation humaine.
      {'\n'} - Réduction de la pression sur les écosystèmes aquatiques naturels.
      {'\n'} - Opportunités économiques pour les petites entreprises et les communautés rurales.
      {'\n'} - Possibilité de cultiver des espèces spécifiques pour des marchés particuliers.
      </Text>

      {/* Section 4 : Aperçu du tutoriel */}
      <Text style={styles.subtitle}>Aperçu du tutoriel</Text>
      <Text style={styles.content}>
  Dans ce tutoriel, nous couvrirons :
  {'\n'}1. La gestion de l'eau en pisciculture.
  {'\n'}2. La nutrition des poissons.
  {'\n'}3. Les types de poissons en pisciculture.
  {'\n'}4. L'entretien quotidien en pisciculture.
  {'\n'}5. Les maladies courantes chez les poissons.
</Text>


      {/* Conclusion */}
      <Text style={styles.content}>
        Prêt à plonger dans le monde passionnant de la pisciculture ?  {'\n'}Suivez chaque chapitre pour devenir un expert dans le domaine !
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
