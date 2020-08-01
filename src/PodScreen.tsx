import React from 'react';
import { ScrollView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu } from 'react-navigation-header-buttons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { StackParamList } from './routes';
import { Pod, Container, VolumeMount, ContainerStatus } from './types';
import PodStatus from './PodStatus';
import { DefaultTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container as ContainerView, Text } from './ThemeComponents';

type PodScreenProps = {
  route: { params: { pod: Pod } };
  navigation: StackNavigationProp<StackParamList, 'Pod'>,
}

interface MappedContainer {
  container?: Container;
  containerStatus?: ContainerStatus;
}

export default function PodScreen({ route, navigation }: PodScreenProps) {
  const pod = route.params.pod;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: pod.metadata.name,
      headerBackTitleVisible: false,
      headerRight: () => <PodScreenHeaderRight {...{route, navigation}} />,
    });
  }, [navigation]);

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
    <ScrollView>
      <ContainerView style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 15 }}>
          <PodStatus pod={pod} />
          <Text style={{ paddingLeft: 8 }}>{pod.status.phase}</Text>
        </View>

        <Text>Namespace: {pod.metadata.namespace}</Text>
        <Text>UID: {pod.metadata.uid}</Text>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Labels</Text>
        <View style={{ padding: 15 }}>
          {Object.keys(pod.metadata.labels || {}).map((labelName) => (
            <Text key={labelName}>{labelName}: {pod.metadata.labels?.[labelName]}</Text>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Conditions</Text>
        <View style={{ padding: 15 }}>
          {pod.status.conditions.map((condition, index) => (
            <View key={index} style={{ paddingBottom: 15 }}>
              <Text>Type: {condition.type}</Text>
              <Text>Status: {condition.status}</Text>
              <Text>Last probe time: {condition.lastProbeTime}</Text>
              <Text>Last transiton time: {condition.lastTransitionTime}</Text>
              <Text>Reason: {condition.reason}</Text>
              <Text>Message: {condition.message}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Host and IPs</Text>
        <TouchableOpacity onPress={() => alert('TODO open node ' + pod.spec.nodeName)}>
          <Text>Node: <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{pod.spec.nodeName}</Text></Text>
        </TouchableOpacity>
        <Text>Host IP: {pod.status.hostIP}</Text>
        <Text>Pod IP: {pod.status.podIP}</Text>
        <Text>QoS class: {pod.status.qosClass}</Text>

        <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>Containers</Text>
        {Object.values(mappedContainers).map((mappedContainer, key) => <ContainerItem {...{key}} {...mappedContainer} />)}

        {pod.metadata.ownerReferences && pod.metadata.ownerReferences.length > 0 ? (
          <View>
            <Text style={{ fontWeight: 'bold', paddingTop: 20 }}>
              {pod.metadata.ownerReferences.length === 1 ? 'Owner' : 'Owners'}
            </Text>
            {pod.metadata.ownerReferences?.map((ownerReference, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Text>apiVersion: {ownerReference.apiVersion}</Text>
                <Text>kind: {ownerReference.kind}</Text>
                <Text>name: {ownerReference.name}</Text>
                <Text>UID: {ownerReference.uid}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ContainerView>
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
