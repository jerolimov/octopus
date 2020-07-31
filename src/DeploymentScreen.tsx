import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from './routes';
import { Deployment } from './types';

type DeploymentScreenProps = {
  route: { params: { deployment: Deployment } };
  navigation: StackNavigationProp<StackParamList, 'Deployment'>,
}

export default function DeploymentScreen({ route, navigation }: DeploymentScreenProps) {
  const deployment = route.params.deployment;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ paddingLeft: 8 }}>{deployment.metadata.name}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Labels</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(deployment.metadata.labels).map((labelName) => (
            <Text>{labelName}={deployment.metadata.labels[labelName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Annotations</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(deployment.metadata.annotations).map((annotationName) => (
            <Text>{annotationName}={deployment.metadata.annotations[annotationName]}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
