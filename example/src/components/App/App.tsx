import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Route } from '../../constants/routes';
import useIterableApp from '../../hooks/useIterableApp';
import type { RootStackParamList } from '../../types/navigation';
import ApiListScreen from '../ApiListScreen';
import CustomizedInbox from '../CustomizedInbox';
import Home from '../Home';
import { routeIcon } from './App.contants';
import { getIcon } from './App.utils';
import { Login, LoginInProgress } from '../Login';
import { colors } from '../../constants';
import { useEffect, useState } from 'react';
import { Iterable } from '@iterable/react-native-sdk';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  const {
    returnToInboxTrigger,
    setReturnToInboxTrigger,
    isInboxTab,
    setIsInboxTab,
    isLoggedIn,
    loginInProgress,
    config,
  } = useIterableApp();
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);

  useEffect(() => {
    if (config && isLoggedIn) {
      Iterable.inAppManager.getMessages().then((messages) => {
        setUnreadMessageCount(messages.length);
      });
    }
  }, [config, isLoggedIn, loginInProgress]);

  if (!isLoggedIn && !loginInProgress) {
    return <Login />;
  }

  return (
    <>
      {loginInProgress && <LoginInProgress />}
      <Tab.Navigator
        screenOptions={({ route }) => {
          const iconName = routeIcon[route.name as keyof typeof routeIcon];
          return {
            tabBarIcon: (props) => getIcon(iconName as string, props),
            tabBarActiveTintColor: colors.brandPurple,
            tabBarInactiveTintColor: colors.textSecondary,
          };
        }}
      >
        <Tab.Screen
          name={Route.Home}
          component={Home}
          listeners={() => ({
            tabPress: () => setIsInboxTab(false),
          })}
        />
        <Tab.Screen
          name={Route.Inbox}
          component={CustomizedInbox}
          options={{ tabBarBadge: unreadMessageCount }}
          listeners={() => ({
            tabPress: () => {
              if (isInboxTab) {
                setReturnToInboxTrigger(!returnToInboxTrigger);
              }
              setIsInboxTab(true);
            },
          })}
        />
        <Tab.Screen
          name={Route.ApiList}
          component={ApiListScreen}
          listeners={() => ({
            tabPress: () => setIsInboxTab(false),
          })}
        />
      </Tab.Navigator>
    </>
  );
}
