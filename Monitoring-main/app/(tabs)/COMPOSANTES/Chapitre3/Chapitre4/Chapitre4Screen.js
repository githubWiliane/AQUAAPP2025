import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Chapitre4Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Types de Poissons en Pisciculture</Text>

      {/* Image principale */}
      <Image
        source={require('../')} // Remplacez avec votre image
        style={styles.image}
      />

      {/* Section 1 : Introduction aux types de poissons */}
      <Text style={styles.subtitle}>Introduction aux types de poissons</Text>
      <Text style={styles.content}>
        La pisciculture implique l'élevage de différentes espèces de poissons, chacune ayant des besoins spécifiques en termes de 
        température, d'alimentation et d'habitat. Choisir les bonnes espèces de poissons est crucial pour une pisciculture réussie. 
        Les espèces les plus courantes sont les poissons d'eau douce et d'eau salée, chacune ayant ses propres caractéristiques.
      </Text>

      {/* Image illustrative */}
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')} // Image supplémentaire
        style={styles.image}
      />

      {/* Section 2 : Poissons d'eau douce */}
      <Text style={styles.subtitle}>Poissons d'eau douce</Text>
      <Text style={styles.content}>
        Les poissons d'eau douce sont élevés dans des bassins ou des étangs à l'eau non salée. Ils sont adaptés aux environnements 
        à faible concentration de sel. Voici quelques exemples de poissons d'eau douce populaires en pisciculture :
        - **Tilapia** : Poisson omnivore, facile à élever, résistant aux maladies.
        - **Truite** : Poisson carnivore, qui nécessite de l'eau froide et bien oxygénée.
        - **Carpe** : Poisson omnivore, robuste, qui peut tolérer une large gamme de conditions de qualité de l'eau.
        - **Perche** : Poisson carnivore, apprécié pour sa chair délicate.
      </Text>

      {/* Image illustrative : Poissons d'eau douce */}
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')} // Remplacez avec une image de poissons d'eau douce
        style={styles.image}
      />

      {/* Section 3 : Poissons d'eau salée */}
      <Text style={styles.subtitle}>Poissons d'eau salée</Text>
      <Text style={styles.content}>
        Les poissons d'eau salée vivent dans des environnements marins avec des niveaux de salinité élevés. Ils nécessitent des 
        conditions spécifiques pour leur élevage en pisciculture, souvent dans des systèmes de cages en mer ou dans des aquariums. 
        Quelques exemples courants :
        - **Bar** : Poisson carnivore prisé pour sa chair fine et délicate.
        - **Dorade** : Poisson d'eau salée populaire pour sa croissance rapide et sa résistance.
        - **Maquereau** : Poisson très apprécié dans les marchés en raison de sa chair savoureuse.
      </Text>

      {/* Image illustrative : Poissons d'eau salée */}
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')} // Remplacez avec une image de poissons d'eau salée
        style={styles.image}
      />

      {/* Section 4 : Poissons adaptés à l'aquaculture */}
      <Text style={styles.subtitle}>Poissons adaptés à l'aquaculture</Text>
      <Text style={styles.content}>
        Certaines espèces de poissons sont particulièrement adaptées à l'aquaculture, offrant une croissance rapide et une bonne résistance 
        aux maladies. Elles sont donc privilégiées dans les systèmes intensifs d'élevage :
        - **Saumon** : Poisson carnivore de haute valeur commerciale, élevé principalement en eau froide.
        - **Tilapia** : Très prisé pour sa rapidité de croissance et sa faible exigence en termes d'habitat.
        - **Truite arc-en-ciel** : Facile à élever et à reproduire, adapté aux systèmes d'eau douce.
      </Text>

      {/* Image illustrative : Poisson d'aquaculture */}
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')} // Remplacez avec une image de poisson d'aquaculture
        style={styles.image}
      />

      {/* Section 5 : Critères pour choisir une espèce */}
      <Text style={styles.subtitle}>Critères pour choisir une espèce</Text>
      <Text style={styles.content}>
        Choisir une espèce de poisson pour la pisciculture dépend de plusieurs critères, tels que :
        - **Les conditions climatiques** : Certaines espèces préfèrent l'eau chaude, d'autres l'eau froide.
        - **La qualité de l'eau** : La dureté de l'eau, le pH et les niveaux d'oxygène doivent être adaptés à chaque espèce.
        - **Les objectifs de production** : Certaines espèces sont choisies pour leur rapidité de croissance, tandis que d'autres sont sélectionnées pour leur valeur commerciale.
        - **Les coûts de production** : Le coût des aliments et l'infrastructure nécessaires pour l'élevage peuvent varier selon l'espèce.
      </Text>

      {/* Image illustrative : Choisir un poisson */}
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')} // Remplacez avec une image représentant le choix d'un poisson
        style={styles.image}
      />

      {/* Section 6 : Problèmes liés à certaines espèces */}
      <Text style={styles.subtitle}>Problèmes liés à certaines espèces</Text>
      <Text style={styles.content}>
        Chaque espèce de poisson présente des défis particuliers en termes de gestion de la qualité de l'eau, de maladies et d'alimentation. 
        Il est important de connaître les besoins spécifiques de chaque espèce pour éviter des problèmes tels que :
        - **Sensibilité aux maladies** : Certaines espèces, comme le tilapia, peuvent être plus sensibles aux infections bactériennes.
        - **Difficultés de reproduction** : Certaines espèces comme la truite peuvent nécessiter des conditions précises pour se reproduire.
        - **Problèmes liés à l'alimentation** : L'équilibre nutritionnel doit être respecté pour éviter les carences ou les excès.
      </Text>

      {/* Image illustrative : Problèmes de poissons */}
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')} // Remplacez avec une image de poisson malade
        style={styles.image}
      />

      {/* Conclusion */}
      <Text style={styles.content}>
        Choisir les bonnes espèces de poissons est un élément clé pour une pisciculture réussie. Il est essentiel de prendre en compte les 
        conditions spécifiques de chaque espèce, ainsi que leur compatibilité avec les autres espèces élevées.
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
