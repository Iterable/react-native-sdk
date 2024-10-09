import { Iterable } from '@iterable/react-native-sdk';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';

import { colors } from '../../constants';
import { Route } from '../../constants/routes';
import { useIterableApp } from '../../hooks/useIterableApp';
import type { RootStackParamList } from '../../types/navigation';
import { Commerce } from '../Commerce';
import { CustomizedInbox } from '../CustomizedInbox';
import { User } from '../User';
import { routeIcon } from './App.contants';
import { getIcon } from './App.utils';

const Tab = createBottomTabNavigator<RootStackParamList>();

export function Main() {
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
          name={Route.Inbox}
          component={CustomizedInbox}
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
}

export default Main;
