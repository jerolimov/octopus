import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import PodListScreen from './src/PodListScreen';
import PodScreen from './src/PodScreen';

import { StackParamList } from './src/routes';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pods" component={PodListScreen} />
        <Stack.Screen name="Pod" component={PodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
