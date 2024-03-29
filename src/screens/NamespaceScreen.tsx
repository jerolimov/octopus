import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { V1Namespace as Namespace } from '@kubernetes/client-node/dist/gen/model/v1Namespace';
import { V1PodList as PodList } from '@kubernetes/client-node/dist/gen/model/v1PodList';

import { get } from '../api';
import { StackParamList } from '../routes';
import NamespaceStatus from '../components/NamespaceStatus';
import { Container, Text } from '../components/ThemeComponents';

type NamespaceScreenProps = {
  route: { params: { namespace: Namespace } };
  navigation: StackNavigationProp<StackParamList, 'Namespace'>,
}

export default function NamespaceScreen({ route, navigation }: NamespaceScreenProps) {
  const namespace = route.params.namespace;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: namespace.metadata?.name,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const [pods, setPods] = useState<PodList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const namespaceName = namespace.metadata?.name;

    get<PodList>(`api/v1/namespaces/${namespaceName}/pods`).then(setPods, setError);
  }, []);

  return (
    <ScrollView>
      <Container style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NamespaceStatus namespace={namespace} />
          <Text style={{ paddingLeft: 8 }}>{namespace.metadata?.name}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>All Pods</Text>
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
