import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import NamespaceListScreen from './src/screens/NamespaceListScreen';
import NamespaceScreen from './src/screens/NamespaceScreen';
import DeploymentListScreen from './src/screens/DeploymentListScreen';
import DeploymentScreen from './src/screens/DeploymentScreen';
import CreateDeploymentScreen from './src/screens/CreateDeploymentScreen';
import ReplicaSetListScreen from './src/screens/ReplicaSetListScreen';
import ReplicaSetScreen from './src/screens/ReplicaSetScreen';
import PodListScreen from './src/screens/PodListScreen';
import PodScreen from './src/screens/PodScreen';
import CustomResourceDefinitionListScreen from './src/screens/CustomResourceDefinitionListScreen';
import CustomResourceDefinitionScreen from './src/screens/CustomResourceDefinitionScreen';
import APIGroupListScreen from './src/screens/APIGroupListScreen';
import APIGroupScreen from './src/screens/APIGroupScreen';
import APIResourceListScreen from './src/screens/APIResourceListScreen';
import APIServiceListScreen from './src/screens/APIServiceListScreen';
import APIServiceScreen from './src/screens/APIServiceScreen';
import ViewYamlScreen from './src/screens/ViewYamlScreen';

import { StackParamList } from './src/routes';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NamespaceList" component={NamespaceListScreen} />
        <Stack.Screen name="Namespace" component={NamespaceScreen} />
        <Stack.Screen name="DeploymentList" component={DeploymentListScreen} />
        <Stack.Screen name="Deployment" component={DeploymentScreen} />
        <Stack.Screen name="CreateDeployment" component={CreateDeploymentScreen} />
        <Stack.Screen name="ReplicaSetList" component={ReplicaSetListScreen} />
        <Stack.Screen name="ReplicaSet" component={ReplicaSetScreen} />
        <Stack.Screen name="Pods" component={PodListScreen} />
        <Stack.Screen name="Pod" component={PodScreen} />
        <Stack.Screen name="CustomResourceDefinitionList" component={CustomResourceDefinitionListScreen} />
        <Stack.Screen name="CustomResourceDefinition" component={CustomResourceDefinitionScreen} />
        <Stack.Screen name="APIGroupList" component={APIGroupListScreen} />
        <Stack.Screen name="APIGroup" component={APIGroupScreen} />
        <Stack.Screen name="APIResourceList" component={APIResourceListScreen} />
        <Stack.Screen name="APIServiceList" component={APIServiceListScreen} />
        <Stack.Screen name="APIService" component={APIServiceScreen} />
        <Stack.Screen name="ViewYaml" component={ViewYamlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
