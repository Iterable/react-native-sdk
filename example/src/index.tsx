import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import App from './components/App';
import { IterableAppProvider } from './hooks';
import { navigationRef } from './navigationRef';

export default function Main() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <IterableAppProvider>
          <App />
        </IterableAppProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
