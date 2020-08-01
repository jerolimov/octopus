import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from './routes';
import { ReplicaSet, PodList } from './types';
import { get } from './api';

type ReplicaSetScreenProps = {
  route: { params: { replicaSet: ReplicaSet } };
  navigation: StackNavigationProp<StackParamList, 'ReplicaSets'>,
}

export default function ReplicaSetScreen({ route, navigation }: ReplicaSetScreenProps) {
  const replicaSet = route.params.replicaSet;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: replicaSet.metadata.name,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const [pods, setPods] = useState<PodList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const matchLabels = replicaSet.spec?.selector?.matchLabels || {};

    const labelSelector = Object.entries(matchLabels).map(([name, value]) => name + '=' + value).join(',');
    const query = '?labelSelector=' + encodeURIComponent(labelSelector);

    get<PodList>('api/v1/namespaces/default/pods' + query).then(setPods, setError);
  }, []);

  console.log('pods', pods);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 15 }}>

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

        <View>
          <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Status</Text>
          <Text>Ready replicas: {replicaSet.status.readyReplicas}</Text>
          <Text>Replicas: {replicaSet.status.replicas}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Pods</Text>
        <View style={{ padding: 15 }}>
          {pods?.items ? pods.items.map((pod) => (
            <View key={pod.metadata.uid}>
              <Text>{pod.metadata.name}</Text>
            </View>
          )) : null}
        </View>

      </View>
    </ScrollView>
  );
}
