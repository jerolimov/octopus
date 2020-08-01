import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import NamespaceListScreen from './src/NamespaceListScreen';
import NamespaceScreen from './src/NamespaceScreen';
import DeploymentListScreen from './src/DeploymentListScreen';
import DeploymentScreen from './src/DeploymentScreen';
import CreateDeploymentScreen from './src/CreateDeploymentScreen';
import PodListScreen from './src/PodListScreen';
import PodScreen from './src/PodScreen';
import ViewYamlScreen from './src/ViewYamlScreen';

import { StackParamList } from './src/routes';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Namespaces" component={NamespaceListScreen} />
        <Stack.Screen name="Namespace" component={NamespaceScreen} />
        <Stack.Screen name="Deployments" component={DeploymentListScreen} />
        <Stack.Screen name="Deployment" component={DeploymentScreen} />
        <Stack.Screen name="CreateDeployment" component={CreateDeploymentScreen} />
        <Stack.Screen name="Pods" component={PodListScreen} />
        <Stack.Screen name="Pod" component={PodScreen} />
        <Stack.Screen name="ViewYaml" component={ViewYamlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
