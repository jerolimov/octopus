import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu } from 'react-navigation-header-buttons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { get, deleteIt } from './api';
import { StackParamList } from './routes';
import { Deployment, PodList } from './types';

type DeploymentScreenProps = {
  route: { params: { deployment: Deployment } };
  navigation: StackNavigationProp<StackParamList, 'Deployment'>,
}

export default function DeploymentScreen({ route, navigation }: DeploymentScreenProps) {
  const deployment = route.params.deployment;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: deployment.metadata.name,
      headerBackTitleVisible: false,
      headerRight: () => <DeploymentScreenHeaderRight {...{route, navigation}} />,
    });
  }, [navigation]);

  const [pods, setPods] = useState<PodList>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const matchLabels = deployment.spec?.selector?.matchLabels || {};

    const labelSelector = Object.entries(matchLabels).map(([name, value]) => name + '=' + value).join(',');
    const query = '?labelSelector=' + encodeURIComponent(labelSelector);

    get<PodList>('api/v1/namespaces/default/pods' + query).then(setPods, setError);
  }, []);

  console.log('pods', pods);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 15 }}>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Labels</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(deployment.metadata.labels || {}).map((labelName) => (
            <Text>{labelName}={deployment.metadata.labels?.[labelName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Annotations</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(deployment.metadata.annotations || {}).map((annotationName) => (
            <Text>{annotationName}={deployment.metadata.annotations?.[annotationName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Pods</Text>
        <View style={{ padding: 15 }}>
          {pods?.items ? pods.items.map((pod) => (
            <View key={pod.metadata.uid}>
              <Text>{pod.metadata.name}</Text>
            </View>
          )) : null}
        </View>

      </View>
    </ScrollView>
  );
}

function DeploymentScreenHeaderRight({ route, navigation }: DeploymentScreenProps) {
  const tintColor = DefaultTheme.colors.primary;

  const deployment = route.params.deployment;

  const onDeletePressed = () => {
    deleteIt(deployment.metadata.selfLink).then((response) => {
      console.warn('Delete successful!', response);
    }, (error) => {
      console.warn('Delete failed!', error);
    });
  };

  return (
    <HeaderButtons>
      <OverflowMenu
        OverflowIcon={<Ionicons name="ios-more" size={24} color={tintColor} />}
      >
        <HiddenItem title="Delete" destructive onPress={onDeletePressed} />
      </OverflowMenu>
    </HeaderButtons>
  )
}
