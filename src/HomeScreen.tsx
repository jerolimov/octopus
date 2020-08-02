import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { DefaultTheme } from '@react-navigation/native';
import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu } from 'react-navigation-header-buttons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { watch, get } from './api';
import { StackParamList } from './routes';
import { Pod, Version } from './types';
import { Container, Text } from './ThemeComponents';

type HomeScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Home'>,
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HomeScreenHeaderRight {...{navigation}} />,
    });
  }, [navigation]);

  useEffect(() => {
    return watch<Pod>('api/v1/namespaces/default/pods?watch=true', (type, pod) => {
      console.warn('onMessage', type, pod.status.phase, pod.metadata.name);
    });
  }, []);

  const [version, setVersion] = useState<Version>();
  useEffect(() => {
    get<Version>('version').then(setVersion, () => {});
  })

  return (
    <ScrollView>
      <Container>
        <TouchableOpacity
          onPress={() => navigation.navigate('Namespaces')}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>Namespaces</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Deployments')}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>Deployments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ReplicaSets')}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>ReplicaSets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pods')}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>Pods</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CustomResourceDefinitions')}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>CustomResourceDefinitions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('APIGroups', { path: 'apis' })}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>APIGroups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('APIGroup', { path: 'apis/apiregistration.k8s.io' })}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>APIGroup apis/apiregistration.k8s.io</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('APIResources', { path: 'apis/apiregistration.k8s.io/v1' })}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>APIResources apis/apiregistration.k8s.io/v1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('APIServices', { path: 'apis/apiregistration.k8s.io/v1/apiservices' })}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>APIServices apis/apiregistration.k8s.io/v1/apiservices</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('APIService', { path: 'apis/apiregistration.k8s.io/v1/apiservices/v1.admissionregistration.k8s.io' })}
          style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>APIService apis/apiregistration.k8s.io/v1/apiservices/v1.admissionregistration.k8s.io</Text>
        </TouchableOpacity>

        {version ? (
          <View style={{ padding: 15 }}>
            <Text>Version: {version.major}.{version.minor} ({version.gitVersion})</Text>
          </View>
        ) : null}
      </Container>
    </ScrollView>
  );
}

function HomeScreenHeaderRight({ navigation }: HomeScreenProps) {
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
