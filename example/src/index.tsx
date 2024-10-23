import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import App from './components/App';
import { IterableAppProvider } from './hooks';

export default function Main() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <IterableAppProvider>
          <App />
        </IterableAppProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
