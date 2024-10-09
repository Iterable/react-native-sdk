import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Route } from '../../constants/routes';
import { useIterableApp } from '../../hooks/useIterableApp';
import { Login } from '../Login';
import { Main } from './Main';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isLoggedIn } = useIterableApp();

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? Route.Home : Route.Login}>
      {isLoggedIn ? (
        <Stack.Screen
          name={Route.Main}
          component={Main}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name={Route.Login}
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
