import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from '../api';
import { StackParamList } from '../routes';
import { CustomResourceDefinitionList, CustomResourceDefinition } from '../types';
import { Container, Text } from '../components/ThemeComponents';

type CustomResourceDefinitionListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'CustomResourceDefinitionList'>,
}

export default function CustomResourceDefinitionListScreen({ navigation }: CustomResourceDefinitionListScreenProps) {
  const [customResourceDefinitions, setCustomResourceDefinitions] = useState<CustomResourceDefinitionList>();
  const [error, setError] = useState<Error>();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      get<CustomResourceDefinitionList>('apis/apiextensions.k8s.io/v1/customresourcedefinitions').then(setCustomResourceDefinitions, setError),
    ]).finally(() => setRefreshing(false));
  };
  useEffect(onRefresh, []);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  return (
    <ScrollView refreshControl={refreshControl}>
      <Container>
        {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
        {customResourceDefinitions ? customResourceDefinitions.items.map((customResourceDefinition, key) => <CustomResourceDefinitionView {...{key, customResourceDefinition, navigation}} />) : null}
      </Container>
    </ScrollView>
  );
}

type CustomResourceDefinitionViewProps = {
  customResourceDefinition: CustomResourceDefinition;
  navigation: StackNavigationProp<StackParamList, 'CustomResourceDefinitionList'>;
}

function CustomResourceDefinitionView({ customResourceDefinition, navigation }: CustomResourceDefinitionViewProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('CustomResourceDefinition', { customResourceDefinition })}
      style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}
    >
      <Text style={{ fontWeight: 'bold' }}>{customResourceDefinition.spec.names.kind}</Text>
      <Text>Group: {customResourceDefinition.spec.group}</Text>
      <Text>Full name: {customResourceDefinition.metadata.name}</Text>
      <Text>Scope: {customResourceDefinition.spec.scope}</Text>
    </TouchableOpacity>
  );
}
