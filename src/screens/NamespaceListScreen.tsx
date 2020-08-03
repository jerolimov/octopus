import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from '../api';
import { StackParamList } from '../routes';
import { NamespaceList, Namespace } from '../types';
import NamespaceStatus from '../components/NamespaceStatus';
import { filterSystemNamespace } from '../utils';
import { Container, Text, Switch } from '../components/ThemeComponents';

type NamespaceListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'NamespaceList'>,
}

export default function NamespaceListScreen({ navigation }: NamespaceListScreenProps) {
  const [showSystemNamespaces, setShowSystemNamespaces] = useState(false);
  const [namespaces, setNamespaces] = useState<NamespaceList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    get<NamespaceList>('api/v1/namespaces').then(setNamespaces, setError);
  }, []);

  const allNamespaces = namespaces?.items || [];
  const filteredNamespaces = showSystemNamespaces ?
    allNamespaces :
    allNamespaces.filter((namespace) => !filterSystemNamespace(namespace));

  return (
    <ScrollView>
      <Container>
        <View style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Switch value={showSystemNamespaces} onValueChange={setShowSystemNamespaces} />
          <Text style={{ paddingLeft: 8 }}>Show system namespaces</Text>
        </View>
        {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
        {filteredNamespaces.map((namespace, key) => <NamespaceView {...{key, namespace, navigation}} />)}
      </Container>
    </ScrollView>
  );
}

type NamespaceViewProps = {
  namespace: Namespace;
  navigation: StackNavigationProp<StackParamList, 'NamespaceList'>;
}

function NamespaceView({ namespace, navigation }: NamespaceViewProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('Namespace', { namespace })}
      style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <NamespaceStatus namespace={namespace} />
      <Text style={{ paddingLeft: 8 }}>{namespace.metadata.name}</Text>
    </TouchableOpacity>
  );
}
