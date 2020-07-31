import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from './api';
import { StackParamList } from './routes';
import { PodList, Pod } from './types';
import PodStatus from './PodStatus';

type PodListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Pods'>,
}

export default function PodListScreen({ navigation }: PodListScreenProps) {
  const [pods, setPods] = useState<PodList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    get<PodList>('api/v1/namespaces/default/pods').then(setPods, setError);
  }, []);

  console.log('pods', pods);

  return (
    <ScrollView>
      {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
      {pods ? pods.items.map((pod, key) => <PodView {...{key, pod, navigation}} />) : null}
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
      style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <PodStatus pod={pod} />
      <Text style={{ paddingLeft: 8 }}>{pod.metadata.name}</Text>
    </TouchableOpacity>
  );
}
