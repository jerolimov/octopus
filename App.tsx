import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import NamespaceListScreen from './src/NamespaceListScreen';
import NamespaceScreen from './src/NamespaceScreen';
import DeploymentListScreen from './src/DeploymentListScreen';
import DeploymentScreen from './src/DeploymentScreen';
import CreateDeploymentScreen from './src/CreateDeploymentScreen';
import ReplicaSetListScreen from './src/ReplicaSetListScreen';
import ReplicaSetScreen from './src/ReplicaSetScreen';
import PodListScreen from './src/PodListScreen';
import PodScreen from './src/PodScreen';
import CustomResourceDefinitionListScreen from './src/CustomResourceDefinitionListScreen';
import CustomResourceDefinitionScreen from './src/CustomResourceDefinitionScreen';
import APIGroupListScreen from './src/APIGroupListScreen';
import APIGroupScreen from './src/APIGroupScreen';
import APIResourceListScreen from './src/APIResourceListScreen';
import APIServiceListScreen from './src/APIServiceListScreen';
import APIServiceScreen from './src/APIServiceScreen';
import ViewYamlScreen from './src/ViewYamlScreen';

import { StackParamList } from './src/routes';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Namespaces" component={NamespaceListScreen} />
        <Stack.Screen name="Namespace" component={NamespaceScreen} />
        <Stack.Screen name="Deployments" component={DeploymentListScreen} />
        <Stack.Screen name="Deployment" component={DeploymentScreen} />
        <Stack.Screen name="CreateDeployment" component={CreateDeploymentScreen} />
        <Stack.Screen name="ReplicaSets" component={ReplicaSetListScreen} />
        <Stack.Screen name="ReplicaSet" component={ReplicaSetScreen} />
        <Stack.Screen name="Pods" component={PodListScreen} />
        <Stack.Screen name="Pod" component={PodScreen} />
        <Stack.Screen name="CustomResourceDefinitions" component={CustomResourceDefinitionListScreen} />
        <Stack.Screen name="CustomResourceDefinition" component={CustomResourceDefinitionScreen} />
        <Stack.Screen name="APIGroups" component={APIGroupListScreen} />
        <Stack.Screen name="APIGroup" component={APIGroupScreen} />
        <Stack.Screen name="APIResources" component={APIResourceListScreen} />
        <Stack.Screen name="APIServices" component={APIServiceListScreen} />
        <Stack.Screen name="APIService" component={APIServiceScreen} />
        <Stack.Screen name="ViewYaml" component={ViewYamlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
