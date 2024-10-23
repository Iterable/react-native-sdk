import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, Route } from '../../constants';
import type { MainScreenParamList } from '../../types';
import { routeIcon } from './App.constants';
import { getIcon } from './App.utils';
import { User } from '../User';

const Tab = createBottomTabNavigator<MainScreenParamList>();

export const Main = () => {
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
        <Tab.Screen name={Route.User} component={User} />
      </Tab.Navigator>
    </>
  );
};

export default Main;
