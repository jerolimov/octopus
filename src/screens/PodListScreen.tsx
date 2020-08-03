import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { V1PodList as PodList } from '@kubernetes/client-node/dist/gen/model/v1PodList';
import { V1Pod as Pod } from '@kubernetes/client-node/dist/gen/model/v1Pod';

import { get } from '../api';
import { StackParamList } from '../routes';
import PodStatus from '../components/PodStatus';
import { Container, Text } from '../components/ThemeComponents';

type PodListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Pods'>,
}

export default function PodListScreen({ navigation }: PodListScreenProps) {
  const [pods, setPods] = useState<PodList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    get<PodList>('api/v1/namespaces/default/pods').then(setPods, setError);
  }, []);

  return (
    <ScrollView>
      <Container>
        {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
        {pods ? pods.items.map((pod, key) => <PodView {...{key, pod, navigation}} />) : null}
      </Container>
    </ScrollView>
  );
}

type PodViewProps = {
  pod: Pod;
  navigation: StackNavigationProp<StackParamList, 'Pods'>;
}

function PodView({ pod, navigation }: PodViewProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('Pod', { pod })}
      style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <PodStatus pod={pod} />
      <Text style={{ paddingLeft: 8 }}>{pod.metadata?.name}</Text>
    </TouchableOpacity>
  );
}
