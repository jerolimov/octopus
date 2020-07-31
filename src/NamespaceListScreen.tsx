import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { BASE_URL } from './config';
import { StackParamList } from './routes';
import { NamespaceList, Namespace } from './types';
import NamespaceStatus from './NamespaceStatus';

type NamespaceListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Namespaces'>,
}

export default function NamespaceListScreen({ navigation }: NamespaceListScreenProps) {
  const url = BASE_URL + 'v1/namespaces';

  const [namespaces, setNamespaces] = useState<NamespaceList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetch(url).then((result) => result.json()).then(setNamespaces, setError);
  }, []);

  console.log('namespaces', namespaces);

  return (
    <ScrollView>
      {error ? <Text>JSON.stringify(error)</Text> : null}
      {namespaces ? namespaces.items.map((namespace, key) => <NamespaceView {...{key, namespace, navigation}} />) : null}
    </ScrollView>
  );
}

type NamespaceViewProps = {
  namespace: Namespace;
  navigation: StackNavigationProp<StackParamList, 'Namespaces'>;
}

function NamespaceView({ namespace, navigation }: NamespaceViewProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('Namespace', { namespace })}
      style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <NamespaceStatus namespace={namespace} />
      <Text style={{ paddingLeft: 8 }}>{namespace.metadata.name}</Text>
    </TouchableOpacity>
  );
}
