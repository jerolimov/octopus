import React, { useState } from 'react';
import { ScrollView, TextInput, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from '../routes';
import { post } from '../api';
import { Deployment } from '../types';
import { Container, Text } from '../components/ThemeComponents';

type CreateDeploymentScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'CreateDeployment'>,
}

export default function CreateDeploymentScreen({ navigation }: CreateDeploymentScreenProps) {
  const [name, setName] = useState('nginx-' + new Date().getMinutes());
  const [image, setImage] = useState('nginx');

  const create = () => {
    const requestBody = {
      "apiVersion": "apps/v1",
      "kind": "Deployment",
      "metadata": {
        "labels": {
          "app": name,
        },
        "name": name,
      },
      "spec": {
        "replicas": 1,
        "selector": {
          "matchLabels": {
            "app": name,
          },
        },
        "template": {
          "metadata": {
            "labels": {
              "app": name,
            },
          },
          "spec": {
            "containers": [
              {
                "image": image,
                "name": image,
              },
            ],
          },
        },
      },
    };
    console.log('Create...', requestBody);

    post<Deployment>('apis/apps/v1/namespaces/default/deployments', requestBody).then((response) => {
      console.warn('Deployment created!', response);
      if (response.apiVersion === 'apps/v1' && response.kind === 'Deployment') {
        navigation.replace('Deployment', { deployment: response });
      }
    }, (error) => {
      console.warn('Error:', error);
    });
  };

  return (
    <ScrollView style={{ padding: 15 }}>
      <Container>
        <Text>Name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{ color: 'black', borderWidth: 1, borderColor: 'lightgray', borderRadius: 5 }}
          />
        <Text>Image:</Text>
        <TextInput
          value={image}
          onChangeText={setImage}
          style={{ color: 'black', borderWidth: 1, borderColor: 'lightgray', borderRadius: 5 }}
          />
        <Button
          title="Create"
          onPress={create}
        />
      </Container>
    </ScrollView>
  );
}
