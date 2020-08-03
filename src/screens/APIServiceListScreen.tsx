import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { V1APIServiceList as APIServiceList } from '@kubernetes/client-node/dist/gen/model/v1APIServiceList';
import { V1APIService as APIService } from '@kubernetes/client-node/dist/gen/model/v1APIService';

import { get } from '../api';
import { StackParamList } from '../routes';
import { Container, Text } from '../components/ThemeComponents';

type APIServiceListScreenProps = {
  route: { params: { path: string } };
  navigation: StackNavigationProp<StackParamList, 'APIServiceList'>,
}

export default function APIServiceListScreen({ route, navigation }: APIServiceListScreenProps) {
  const path = route.params.path;

  const [apiServices, setAPIServices] = useState<APIServiceList>();
  const [error, setError] = useState<Error>();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      get<APIServiceList>(path).then(setAPIServices, setError),
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
        {apiServices ? apiServices.items.map((apiService, key) => <APIServiceView {...{key, prefixPath: path, apiService, navigation}} />) : null}
      </Container>
    </ScrollView>
  );
}

type APIServiceViewProps = {
  prefixPath: string;
  apiService: APIService;
  navigation: StackNavigationProp<StackParamList, 'APIServiceList'>;
}

function APIServiceView({ prefixPath, apiService, navigation }: APIServiceViewProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('APIService', { path: apiService.metadata?.selfLink })}
      style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text>
        <Text style={{ fontWeight: 'bold' }}>{apiService.metadata?.name}</Text>
      </Text>
    </TouchableOpacity>
  );
}
