import { Iterable } from '@iterable/react-native-sdk';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';

import { colors } from '../../constants';
import { Route } from '../../constants/routes';
import { useIterableApp } from '../../hooks/useIterableApp';
import type { RootStackParamList } from '../../types/navigation';
import { Commerce } from '../Commerce';
import { CustomizedInbox } from '../CustomizedInbox';
import { Home } from '../Home';
import { LoginToView } from '../Login';
import { routeIcon } from './App.contants';
import { getIcon } from './App.utils';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  const {
    config,
    isInboxTab,
    isLoggedIn,
    loginInProgress,
    returnToInboxTrigger,
    setIsInboxTab,
    setReturnToInboxTrigger,
  } = useIterableApp();
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);

  useEffect(() => {
    if (config && isLoggedIn && !loginInProgress) {
      Iterable.inAppManager.getMessages().then((messages) => {
        setUnreadMessageCount(messages.length);
      });
    } else if (!isLoggedIn && !loginInProgress) {
      // Reset unread message count when user logs out
      setUnreadMessageCount(0);
    }
  }, [config, isLoggedIn, loginInProgress]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const iconName = routeIcon[route.name as keyof typeof routeIcon];
          return {
            tabBarIcon: (props) => getIcon(iconName as string, props),
            tabBarActiveTintColor: colors.brandPurple,
            tabBarInactiveTintColor: colors.textSecondary,
            headerShown: false,
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
          component={isLoggedIn ? CustomizedInbox : LoginToView}
          options={
            unreadMessageCount ? { tabBarBadge: unreadMessageCount } : {}
          }
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
          name={Route.Commerce}
          component={isLoggedIn ? Commerce : LoginToView}
          listeners={() => ({
            tabPress: () => setIsInboxTab(false),
          })}
        />
      </Tab.Navigator>
    </>
  );
}
