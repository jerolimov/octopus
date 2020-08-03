import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { V1APIGroupList as APIGroupList } from '@kubernetes/client-node/dist/gen/model/v1APIGroupList';
import { V1APIGroup as APIGroup } from '@kubernetes/client-node/dist/gen/model/v1APIGroup';

import { get } from '../api';
import { StackParamList } from '../routes';
import { Container, Text } from '../components/ThemeComponents';

type APIGroupListScreenProps = {
  route: { params: { path: string } };
  navigation: StackNavigationProp<StackParamList, 'APIGroupList'>,
}

export default function APIGroupListScreen({ route, navigation }: APIGroupListScreenProps) {
  const path = route.params.path;

  const [apiGroups, setAPIGroups] = useState<APIGroupList>();
  const [error, setError] = useState<Error>();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      get<APIGroupList>(path).then(setAPIGroups, setError),
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
        {apiGroups ? apiGroups.groups.map((apiGroup, key) => <APIGroupView {...{key, prefixPath: path, apiGroup, navigation}} />) : null}
      </Container>
    </ScrollView>
  );
}

type APIGroupViewProps = {
  prefixPath: string;
  apiGroup: APIGroup;
  navigation: StackNavigationProp<StackParamList, 'APIGroupList'>;
}

function APIGroupView({ prefixPath, apiGroup, navigation }: APIGroupViewProps) {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.push('APIGroup', { path: prefixPath + '/' + apiGroup.name })}
        style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>
          <Text style={{ fontWeight: 'bold' }}>{apiGroup.name}</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.push('APIResourceList', { path: prefixPath + '/' + apiGroup.preferredVersion?.groupVersion })}
        style={{ padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>
          <Text style={{ fontWeight: 'bold' }}>{apiGroup.name}</Text>
          <Text>{' / ' + apiGroup.preferredVersion?.version}</Text>
        </Text>
      </TouchableOpacity>
    </>
  );
}
