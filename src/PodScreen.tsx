import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu } from 'react-navigation-header-buttons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { StackParamList } from './routes';
import { Pod, Container, VolumeMount, ContainerStatus } from './types';
import PodStatus from './PodStatus';
import { DefaultTheme } from '@react-navigation/native';

type PodScreenProps = {
  route: { params: { pod: Pod } };
  navigation: StackNavigationProp<StackParamList, 'Pod'>,
}

interface MappedContainer {
  container?: Container;
  containerStatus?: ContainerStatus;
}

export default function PodScreen({ route, navigation }: PodScreenProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <PodScreenHeaderRight {...{route, navigation}} />,
    });
  }, [navigation]);

  const pod = route.params.pod;

  const mappedContainers: Record<string, MappedContainer> = {};
  pod.spec.containers.forEach((container) => {
    mappedContainers[container.name] = {
      ...mappedContainers[container.name],
      container,
    };
  });
  pod.status.containerStatuses.forEach((containerStatus) => {
    mappedContainers[containerStatus.name] = {
      ...mappedContainers[containerStatus.name],
      containerStatus,
    };
  });

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <PodStatus pod={pod} />
          <Text style={{ paddingLeft: 8 }}>{pod.metadata.name}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Labels</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(pod.metadata.labels).map((labelName) => (
            <Text key={labelName}>{labelName}={pod.metadata.labels[labelName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Containers</Text>
        {Object.values(mappedContainers).map((mappedContainer, key) => <ContainerItem {...{key}} {...mappedContainer} />)}
      </View>
    </ScrollView>
  );
}

function PodScreenHeaderRight({ route, navigation }: PodScreenProps) {
  const tintColor = DefaultTheme.colors.primary;

  const pod = route.params.pod;

  const viewYaml = () => {
    navigation.push('ViewYaml', { yaml: pod });
  };

  return (
    <HeaderButtons>
      <OverflowMenu
        OverflowIcon={<Ionicons name="ios-more" size={24} color={tintColor} />}
      >
        <HiddenItem title="View YAML" onPress={viewYaml} />
      </OverflowMenu>
    </HeaderButtons>
  )
}

function ContainerItem({ container, containerStatus }: MappedContainer) {
  return (
    <View style={{ padding: 15 }}>
      <Text>Ready: {containerStatus?.ready ? 'True' : 'False'}</Text>
      <Text>Started: {containerStatus?.started ? 'Started' : 'Not started'}</Text>
      <Text>Name: {container?.name}</Text>
      <Text>Image: {container?.image}</Text>
      <Text style={{ paddingTop: 10 }}>Volume mounts:</Text>
      {container?.volumeMounts.map((volumeMount, key) => <VolumeMountItem {...{key, volumeMount}} />)}
    </View>
  );
}

function VolumeMountItem({ volumeMount }: { volumeMount: VolumeMount }) {
  return (
    <View style={{ padding: 15 }}>
      <Text>name: {volumeMount.name}</Text>
      <Text>mountPath: {volumeMount.mountPath}</Text>
      <Text>{volumeMount.readOnly ? 'Read only' : 'Read write'}</Text>
    </View>
  );
}
