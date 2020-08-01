import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from './routes';
import { ReplicaSet } from './types';

type ReplicaSetScreenProps = {
  route: { params: { replicaSet: ReplicaSet } };
  navigation: StackNavigationProp<StackParamList, 'ReplicaSets'>,
}

export default function ReplicaSetScreen({ route, navigation }: ReplicaSetScreenProps) {
  const replicaSet = route.params.replicaSet;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ paddingLeft: 8 }}>{replicaSet.metadata.name}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Labels</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(replicaSet.metadata.labels || {}).map((labelName) => (
            <Text>{labelName}={replicaSet.metadata.labels?.[labelName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Annotations</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(replicaSet.metadata.annotations || {}).map((annotationName) => (
            <Text>{annotationName}={replicaSet.metadata.annotations?.[annotationName]}</Text>
          ))}
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Status</Text>
        <Text>Ready replicas: {replicaSet.status.readyReplicas}</Text>
        <Text>Replicas: {replicaSet.status.replicas}</Text>
      </View>
    </ScrollView>
  );
}
