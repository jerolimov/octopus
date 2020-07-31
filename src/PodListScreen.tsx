import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { BASE_URL } from './config';
import { StackParamList } from './routes';
import { PodList, Pod } from './types';
import PodStatus from './PodStatus';

type PodListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Pods'>,
}

export default function PodListScreen({ navigation }: PodListScreenProps) {
  const url = BASE_URL + 'v1/namespaces/default/pods';

  const [pods, setPods] = useState<PodList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetch(url).then((result) => result.json()).then(setPods, setError);
  }, []);

  return (
    <ScrollView>
      {error ? <Text>JSON.stringify(error)</Text> : null}
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
