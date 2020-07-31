import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity, Switch } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from './api';
import { StackParamList } from './routes';
import { NamespaceList, Namespace } from './types';
import NamespaceStatus from './NamespaceStatus';
import { filterSystemNamespace } from './utils';

type NamespaceListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Namespaces'>,
}

export default function NamespaceListScreen({ navigation }: NamespaceListScreenProps) {
  const [showSystemNamespaces, setShowSystemNamespaces] = useState(false);
  const [namespaces, setNamespaces] = useState<NamespaceList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    get<NamespaceList>('api/v1/namespaces').then(setNamespaces, setError);
  }, []);

  console.log('namespaces', namespaces);

  const allNamespaces = namespaces?.items || [];
  const filteredNamespaces = showSystemNamespaces ?
    allNamespaces :
    allNamespaces.filter((namespace) => !filterSystemNamespace(namespace));

  return (
    <ScrollView>
      <View style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Switch value={showSystemNamespaces} onValueChange={setShowSystemNamespaces} />
        <Text style={{ paddingLeft: 8 }}>Show system namespaces</Text>
      </View>
      {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
      {filteredNamespaces.map((namespace, key) => <NamespaceView {...{key, namespace, navigation}} />)}
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
