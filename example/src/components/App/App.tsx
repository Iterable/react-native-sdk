import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Route } from '../../constants/routes';
import { useIterableApp } from '../../hooks/useIterableApp';
import { Login } from '../Login';
import { Main } from './Main';
import type { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  const { isLoggedIn } = useIterableApp();

  return (
    <Stack.Navigator>
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
};

export default App;
