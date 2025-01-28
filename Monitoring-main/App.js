import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './app/(tabs)/COMPOSANTES/SplashScreen/SplashScreen.js'; // Assurez-vous que le chemin est correct
import TableauDebord from './app/(tabs)/COMPOSANTES/TableauBord/DashboardScreen';
import AlimentationScreen from './app/(tabs)/COMPOSANTES/AlimentationScreen/AlimentationScreen';
import GraphiquesScreen from './app/(tabs)/COMPOSANTES/graphique/GraphiquesScreen.js';
import 'react-native-gesture-handler';
 import TutoScreen from './/app/(tabs)/COMPOSANTES/Tuto/TutoScreen.js';
 import Chapitre1Screen from './app/(tabs)/COMPOSANTES/chapitre1/Chapitre1Screen.js';
 import Chapitre2Screen from './app/(tabs)/COMPOSANTES/Chapitre2/Chapitre2Screen.js';
 import Chapitre3Screen from './app/(tabs)/COMPOSANTES/Chapitre3/Chapitre3Screen.js';
import Chapitre4Screen from './app/(tabs)/COMPOSANTES/Chapitre4/Chapitre4Screen.js';
import Chapitre5Screen from './app/(tabs)/COMPOSANTES/Chapitre5/Chapitre5Screen.js';
import Chapitre6Screen from './app/(tabs)/COMPOSANTES/Chapitre6/Chapitre6Screen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TableauDebord">
        {/* SplashScreen est l'écran initial */}
         
        {/* Les autres écrans de l'application */}
        <Stack.Screen
          name="TableauDebord"
          component={TableauDebord}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Alimentation"
          component={AlimentationScreen}
          options={{ title: 'Alimentation' }}
        />
        <Stack.Screen
          name="Graphiques"
          component={GraphiquesScreen}
        />
      <Stack.Screen 
          name="Tuto" 
          component={TutoScreen} 
          options={{ title: '' }} 
        />

<Stack.Screen name="TutoScreen"     component={TutoScreen} />

      <Stack.Screen name="Chapitre1Screen"  options={{ title: '' }} component={Chapitre1Screen} />
  
      <Stack.Screen name="Chapitre2Screen"  options={{ title: '' }} component={Chapitre2Screen} />

      <Stack.Screen name="Chapitre3Screen"  options={{ title: '' }} component={Chapitre3Screen} />

      <Stack.Screen name="Chapitre4Screen"  options={{ title: '' }} component={Chapitre4Screen} />
      
      <Stack.Screen name="Chapitre5Screen"  options={{ title: '' }} component={Chapitre5Screen} />

      <Stack.Screen name="Chapitre6Screen"  options={{ title: '' }} component={Chapitre6Screen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
