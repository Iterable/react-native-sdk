import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';

import { Iterable } from '@iterable/react-native-sdk';

import { colors, Route } from '../../constants';
import type { MainScreenParamList } from '../../types';
import { routeIcon } from './App.constants';
import { getIcon } from './App.utils';
import { User } from '../User';
import { Inbox } from '../Inbox';
import { useIterableApp } from '../../hooks';
import { Commerce } from '../Commerce';

const Tab = createBottomTabNavigator<MainScreenParamList>();

export const Main = () => {
  const {
    isInboxTab,
    isLoggedIn,
    loginInProgress,
    returnToInboxTrigger,
    setIsInboxTab,
    setReturnToInboxTrigger,
    userId,
  } = useIterableApp();
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);

  useEffect(() => {
    if (loginInProgress) return;
    if (isLoggedIn) {
      Iterable.inAppManager.getMessages().then((messages) => {
        setUnreadMessageCount(messages.length);
      });
    } else {
      // Reset unread message count when user logs out
      setUnreadMessageCount(0);
    }
  }, [isLoggedIn, loginInProgress, userId]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const iconName = routeIcon[route.name];
          return {
            tabBarIcon: (props) => getIcon(iconName, props),
            tabBarActiveTintColor: colors.brandPurple,
            tabBarInactiveTintColor: colors.textSecondary,
            headerShown: false,
          };
        }}
      >
        <Tab.Screen
          name={Route.Inbox}
          component={Inbox}
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
          component={Commerce}
          listeners={() => ({
            tabPress: () => setIsInboxTab(false),
          })}
        />
        <Tab.Screen
          name={Route.User}
          component={User}
          listeners={() => ({
            tabPress: () => setIsInboxTab(false),
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default Main;
