import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from '../api';
import { StackParamList } from '../routes';
import { APIService } from '../types';
import { Container, Text } from '../components/ThemeComponents';

type APIServiceScreenProps = {
  route: { params: { path: string } };
  navigation: StackNavigationProp<StackParamList, 'APIService'>,
}

export default function APIServiceScreen({ route, navigation }: APIServiceScreenProps) {
  const path = route.params.path;

  const [apiService, setAPIService] = useState<APIService>();
  const [error, setError] = useState<Error>();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      get<APIService>(path).then(setAPIService, setError),
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
        {apiService ? (
          <View style={{ padding: 15 }}>
            <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>{apiService.metadata.name}</Text>
            <Text>UID: {apiService.metadata.uid}</Text>
            <Text>Resource version: {apiService.metadata.resourceVersion}</Text>
            <Text>Creation timestamp: {apiService.metadata.creationTimestamp}</Text>
          </View>
        ) : null}

        <Text style={{ padding: 15, fontWeight: 'bold' }}>Conditions</Text>
        <View style={{ paddingHorizontal: 30, paddingVertical: 15 }}>
          {apiService?.status?.conditions?.map((condition, index) => (
            <View key={index} style={{ paddingBottom: 15 }}>
              <Text>Type: {condition.type}</Text>
              <Text>Status: {condition.status}</Text>
              {/*<Text>Last probe time: {condition.lastProbeTime}</Text>*/}
              <Text>Last transiton time: {condition.lastTransitionTime}</Text>
              <Text>Reason: {condition.reason}</Text>
              <Text>Message: {condition.message}</Text>
            </View>
          ))}
        </View>

      </Container>
    </ScrollView>
  );
}
