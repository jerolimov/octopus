import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { V1PodList as PodList } from '@kubernetes/client-node/dist/gen/model/v1PodList';
import { V1ReplicaSet as ReplicaSet } from '@kubernetes/client-node/dist/gen/model/v1ReplicaSet';

import { StackParamList } from '../routes';
import { get } from '../api';
import { Container, Text } from '../components/ThemeComponents';

type ReplicaSetScreenProps = {
  route: { params: { replicaSet: ReplicaSet } };
  navigation: StackNavigationProp<StackParamList, 'ReplicaSetList'>,
}

export default function ReplicaSetScreen({ route, navigation }: ReplicaSetScreenProps) {
  const replicaSet = route.params.replicaSet;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: replicaSet.metadata?.name,
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

  return (
    <ScrollView>
      <Container style={{ padding: 15 }}>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Labels</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(replicaSet.metadata?.labels || {}).map((labelName, index) => (
            <Text key={index}>{labelName}={replicaSet.metadata?.labels?.[labelName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Annotations</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(replicaSet.metadata?.annotations || {}).map((annotationName, index) => (
            <Text key={index}>{annotationName}={replicaSet.metadata?.annotations?.[annotationName]}</Text>
          ))}
        </View>

        <View>
          <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Status</Text>
          <Text>Ready replicas: {replicaSet.status?.readyReplicas}</Text>
          <Text>Replicas: {replicaSet.status?.replicas}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Pods</Text>
        <View style={{ padding: 15 }}>
          {pods?.items ? pods.items.map((pod) => (
            <View key={pod.metadata?.uid}>
              <Text>{pod.metadata?.name}</Text>
            </View>
          )) : null}
        </View>

      </Container>
    </ScrollView>
  );
}
