import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from './api';
import { StackParamList } from './routes';
import { APIResourceList, APIResource } from './types';
import { Container, Text } from './ThemeComponents';

type APIResourceListScreenProps = {
  route: { params: { path: string } };
  navigation: StackNavigationProp<StackParamList, 'APIResources'>,
}

export default function APIResourceListScreen({ route, navigation }: APIResourceListScreenProps) {
  const path = route.params.path;

  const [apiResources, setAPIResources] = useState<APIResourceList>();
  const [error, setError] = useState<Error>();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      get<APIResourceList>(path).then(setAPIResources, setError),
    ]).finally(() => setRefreshing(false));
  };
  useEffect(onRefresh, [route]);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  return (
    <ScrollView refreshControl={refreshControl}>
      <Container>
        {error ? <Text>{JSON.stringify(error, null, 2)}</Text> : null}
        {apiResources ? apiResources.resources.map((apiResource, key) => <APIResourceView {...{key, prefixPath: path, apiResource, navigation}} />) : null}
      </Container>
    </ScrollView>
  );
}

type APIResourceViewProps = {
  prefixPath: string;
  apiResource: APIResource;
  navigation: StackNavigationProp<StackParamList, 'APIResources'>;
}

function APIResourceView({ prefixPath, apiResource, navigation }: APIResourceViewProps) {
  const open = () => {
    if (apiResource.kind === 'APIService') {
      navigation.push('APIServices', { path: prefixPath + '/' + apiResource.name });
    } else {
      alert('Unknown resource type ' + apiResource.kind);
    }
  }
  return (
    <TouchableOpacity
      onPress={open}
      style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}
    >
      <Text style={{ fontWeight: 'bold' }}>{apiResource.name}</Text>
      <Text>{apiResource.namespaced ? 'Namespaced' : 'Cluster'}</Text>
    </TouchableOpacity>
  );
}
