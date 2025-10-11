import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, Route } from '../../constants';
import type { MainScreenParamList } from '../../types';
import { routeIcon } from './App.constants';
import { getIcon } from './App.utils';
import { User } from '../User';
import { Inbox } from '../Inbox';
import { useIterableApp } from '../../hooks';
import { Commerce } from '../Commerce';
import { Embedded } from '../Embedded';

const Tab = createBottomTabNavigator<MainScreenParamList>();

export const Main = () => {
  const {
    isInboxTab,
    returnToInboxTrigger,
    setIsInboxTab,
    setReturnToInboxTrigger,
  } = useIterableApp();

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
          name={Route.Embedded}
          component={Embedded}
          listeners={() => ({
            tabPress: () => setIsInboxTab(false),
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
