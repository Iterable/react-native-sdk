/* eslint-disable react-native/split-platform-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import { Route } from '../../constants/routes';
import { useIterableApp } from '../../hooks/useIterableApp';
import type { RootStackParamList } from '../../types';
import { Login } from '../Login';
import { Main } from './Main';

const Stack = createNativeStackNavigator<RootStackParamList>();

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    const apiLevel = Platform.Version; // Get the Android API level

    if (apiLevel >= 33) {
      // Check if Android 13 or higher
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message:
              'This app needs access to your notifications for push, in-app messages, embedded messages and more.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // For Android versions below 13, notification permission is generally not required
      // or is automatically granted upon app installation.
      console.log(
        'Notification permission not required for this Android version.'
      );
    }
  }
};

export const App = () => {
  const { isLoggedIn } = useIterableApp();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
