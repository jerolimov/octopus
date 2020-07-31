import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from './routes';
import { Namespace } from './types';
import NamespaceStatus from './NamespaceStatus';

type NamespaceScreenProps = {
  route: { params: { namespace: Namespace } };
  navigation: StackNavigationProp<StackParamList, 'Namespace'>,
}

export default function NamespaceScreen({ route }: NamespaceScreenProps) {
  const namespace = route.params.namespace;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NamespaceStatus namespace={namespace} />
          <Text style={{ paddingLeft: 8 }}>{namespace.metadata.name}</Text>
        </View>
        <Text style={{ paddingTop: 15 }}>
          {JSON.stringify(namespace, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
}
