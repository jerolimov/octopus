import React from 'react';
import { ScrollView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from '../routes';
import { CustomResourceDefinition } from '../types';
import { Container, Text } from '../components/ThemeComponents';

type CustomResourceDefinitionScreenProps = {
  route: { params: { customResourceDefinition: CustomResourceDefinition } };
  navigation: StackNavigationProp<StackParamList, 'CustomResourceDefinitionList'>,
}

export default function CustomResourceDefinitionScreen({ route, navigation }: CustomResourceDefinitionScreenProps) {
  const customResourceDefinition = route.params.customResourceDefinition;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // title: customResourceDefinition.spec.names.kind,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Container style={{ padding: 15 }}>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Name:</Text>
        <Text>{customResourceDefinition.spec.names.kind}</Text>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Group:</Text>
        <Text>{customResourceDefinition.spec.group}</Text>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Full name:</Text>
        <Text>{customResourceDefinition.metadata.name}</Text>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Scope:</Text>
        <Text>{customResourceDefinition.spec.scope}</Text>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Names</Text>
        <View style={{ padding: 15 }}>
          <Text>singular: {customResourceDefinition.spec.names.singular}</Text>
          <Text>plural: {customResourceDefinition.spec.names.plural}</Text>
          <Text>Kind: {customResourceDefinition.spec.names.kind}</Text>
          <Text>List kind: {customResourceDefinition.spec.names.listKind}</Text>
          <Text>Categories: {customResourceDefinition.spec.names.categories.join(', ')}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Labels</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(customResourceDefinition.metadata.labels || {}).map((labelName) => (
            <Text>{labelName}={customResourceDefinition.metadata.labels?.[labelName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Annotations</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(customResourceDefinition.metadata.annotations || {}).map((annotationName) => (
            <Text>{annotationName}={customResourceDefinition.metadata.annotations?.[annotationName]}</Text>
          ))}
        </View>

      </Container>
    </ScrollView>
  );
}
