import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Iterable } from '@iterable/react-native-sdk';

import { Route } from '../../constants/routes';
import { useIterableApp } from '../../hooks/useIterableApp';
import { Login } from '../Login';
import { Main } from './Main';
import type { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  console.log('Iterable.version', Iterable.getVersionFromPackageJson());
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
