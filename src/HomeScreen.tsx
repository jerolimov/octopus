import React from 'react';
import { ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { DefaultTheme } from '@react-navigation/native';
import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu } from 'react-navigation-header-buttons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { StackParamList } from './routes';

type HomeScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Home'>,
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HomeScreenHeaderRight {...{navigation}} />,
    });
  }, [navigation]);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Namespaces')}
        style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>Namespaces</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Deployments')}
        style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>Deployments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Pods')}
        style={{ backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>Pods</Text>
      </TouchableOpacity>
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
