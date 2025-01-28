import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeToggleIcon = ({ isDarkTheme, setIsDarkTheme }) => {
  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem('theme', JSON.stringify(newTheme)); // Sauvegarde du thème
  };

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={toggleTheme}>
      <Image
        source={isDarkTheme ? require('../assets/sun-icon.png') : require('../assets/moon-icon.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ThemeToggleIcon;
