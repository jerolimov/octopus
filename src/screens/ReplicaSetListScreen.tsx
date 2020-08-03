import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { V1ReplicaSet as ReplicaSet } from '@kubernetes/client-node/dist/gen/model/v1ReplicaSet';
import { V1ReplicaSetList as ReplicaSetList } from '@kubernetes/client-node/dist/gen/model/v1ReplicaSetList';

import { get } from '../api';
import { StackParamList } from '../routes';
import { Container, Text } from '../components/ThemeComponents';

type ReplicaSetListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'ReplicaSetList'>,
}

export default function ReplicaSetListScreen({ navigation }: ReplicaSetListScreenProps) {
  const [replicaSets, setReplicaSets] = useState<ReplicaSetList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    get<ReplicaSetList>('apis/apps/v1/namespaces/default/replicasets').then(setReplicaSets, setError);
  }, []);

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
  navigation: StackNavigationProp<StackParamList, 'ReplicaSetList'>;
}

function ReplicaSetView({ replicaSet, navigation }: ReplicaSetViewProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('ReplicaSet', { replicaSet })}
      style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ paddingLeft: 8 }}>{replicaSet.metadata?.name}</Text>
    </TouchableOpacity>
  );
}
