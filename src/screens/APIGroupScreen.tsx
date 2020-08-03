import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { get } from '../api';
import { StackParamList } from '../routes';
import { APIGroup } from '../types';
import { Container, Text } from '../components/ThemeComponents';

type APIGroupScreenProps = {
  route: { params: { path: string } };
  navigation: StackNavigationProp<StackParamList, 'APIGroup'>,
}

export default function APIGroupScreen({ route, navigation }: APIGroupScreenProps) {
  const path = route.params.path;

  const [apiGroup, setAPIGroup] = useState<APIGroup>();
  const [error, setError] = useState<Error>();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      get<APIGroup>(path).then(setAPIGroup, setError),
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
        {apiGroup ? (
          <View>
            <Text>{apiGroup.name}</Text>
          </View>
        ) : null}
        {apiGroup?.versions.map((version) => (
          <TouchableOpacity
            onPress={() => navigation.push('APIResourceList', { path: path + '/' + version.groupVersion })}
            style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
          >
            <Text>
              <Text>{version.version}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </Container>
    </ScrollView>
  );
}
