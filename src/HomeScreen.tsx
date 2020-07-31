import React from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from './routes';

type HomeScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Home'>,
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Namespaces')}
        style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>Namespaces</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Deployments')}
        style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>Deployments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Pods')}
        style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>Pods</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
