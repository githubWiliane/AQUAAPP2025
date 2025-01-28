import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Rediriger après 3 secondes vers le Dashboard
    const timer = setTimeout(() => {
      navigation.replace('TableauDebord'); // Remplace l'écran actuel avec TableauDebord
    }, 3000);

    // Nettoyage du timer à la destruction de l'écran
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../SplashScreen/icon.png')}  // Assurez-vous que le chemin est correct
        style={styles.image}
        resizeMode="contain"  // Ajuste l'image pour qu'elle soit contenue dans l'écran sans être coupée
      />
      <Image
        source={require('../SplashScreen/icon2.png')}  // Assurez-vous que le chemin est correct
        style={styles.image2}
        resizeMode="contain"  // Ajuste l'image pour qu'elle soit contenue dans l'écran sans être coupée
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Couleur de fond pour l'écran de Splash
  },
  image: {
    width: '80%',   // Utilisation de pourcentages pour s'adapter aux écrans
    height: '50%',  // Ajustez selon votre image et vos préférences
    top:100,
  },
  image2:{
    width: '40%',   // Utilisation de pourcentages pour s'adapter aux écrans
    height: '50%',  // Ajustez selon votre image et vos préférences
    bottom: 180,
  }
});

export default SplashScreen;
