import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu } from 'react-navigation-header-buttons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { get } from './api';
import { StackParamList } from './routes';
import { DeploymentList, Deployment } from './types';
import { DefaultTheme } from '@react-navigation/native';

type DeploymentListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Deployments'>,
}

export default function DeploymentListScreen({ navigation }: DeploymentListScreenProps) {
  const [deployments, setDeployments] = useState<DeploymentList>();
  const [error, setError] = useState<Error>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DeploymentListScreenHeaderRight {...{navigation}} />,
    });
  }, [navigation]);

  useEffect(() => {
    get<DeploymentList>('apis/apps/v1/namespaces/default/deployments').then(setDeployments, setError);
  }, []);

  console.log('deployments', deployments);

  return (
    <ScrollView>
      {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
      {deployments ? deployments.items.map((deployment, key) => <DeploymentView {...{key, deployment, navigation}} />) : null}
    </ScrollView>
  );
}

type DeploymentViewProps = {
  deployment: Deployment;
  navigation: StackNavigationProp<StackParamList, 'Deployments'>;
}

function DeploymentView({ deployment, navigation }: DeploymentViewProps) {
  const x = deployment.status.readyReplicas;
  const y = deployment.status.replicas;
  return (
    <TouchableOpacity
      onPress={() => navigation.push('Deployment', { deployment })}
      style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ minWidth: 80 }}>{x} / {y} ready</Text>
      <Text style={{ paddingLeft: 8 }}>{deployment.metadata.name}</Text>
    </TouchableOpacity>
  );
}

function DeploymentListScreenHeaderRight({ navigation }: DeploymentListScreenProps) {
  const tintColor = DefaultTheme.colors.primary;

  return (
    <HeaderButtons>
      <OverflowMenu
        OverflowIcon={<Ionicons name="ios-more" size={24} color={tintColor} />}
      >
        <HiddenItem title="Create Deployment" onPress={() => navigation.push('CreateDeployment')} />
      </OverflowMenu>
    </HeaderButtons>
  )
}
