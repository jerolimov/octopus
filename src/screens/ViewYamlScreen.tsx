import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import YAML from 'yaml';

import { StackParamList } from '../routes';
import { Container, Text } from '../components/ThemeComponents';

type DeploymentScreenProps = {
  route: { params: { yaml: any } };
  navigation: StackNavigationProp<StackParamList, 'ViewYaml'>,
}

export default function ViewYamlScreen({ route }: DeploymentScreenProps) {
  const yaml = convertToYamlString(route.params.yaml);
  const fontFamily = Platform.OS === 'ios' ? 'Menlo-Regular' : 'Courier';

  return (
    <ScrollView>
      <Container>
        <Text style={{ fontFamily, padding: 10 }}>{yaml}</Text>
      </Container>
    </ScrollView>
  );
}

function convertToYamlString(yaml: any) {
  if (typeof yaml === 'string') {
    return yaml;
  } else {
    return YAML.stringify(yaml)
  }
}
