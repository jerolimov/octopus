import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from './api';
import { StackParamList } from './routes';
import { ReplicaSetList, ReplicaSet } from './types';
import { Container, Text } from './ThemeComponents';

type ReplicaSetListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'ReplicaSets'>,
}

export default function ReplicaSetListScreen({ navigation }: ReplicaSetListScreenProps) {
  const [replicaSets, setReplicaSets] = useState<ReplicaSetList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    get<ReplicaSetList>('apis/apps/v1/namespaces/default/replicasets').then(setReplicaSets, setError);
  }, []);

  console.log('replicaSets', replicaSets);

  return (
    <ScrollView>
      <Container>
        {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
        {replicaSets ? replicaSets.items.map((replicaSet, key) => <ReplicaSetView {...{key, replicaSet, navigation}} />) : null}
      </Container>
    </ScrollView>
  );
}

type ReplicaSetViewProps = {
  replicaSet: ReplicaSet;
  navigation: StackNavigationProp<StackParamList, 'ReplicaSets'>;
}

function ReplicaSetView({ replicaSet, navigation }: ReplicaSetViewProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('ReplicaSet', { replicaSet })}
      style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ paddingLeft: 8 }}>{replicaSet.metadata.name}</Text>
    </TouchableOpacity>
  );
}
