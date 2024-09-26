import { useDeviceOrientation } from '@iterable/react-native-sdk';
import {
  type FunctionComponent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Iterable,
  IterableAction,
  IterableActionContext,
  IterableConfig,
  IterableInAppMessage,
  IterableInAppShowResponse,
  IterableLogLevel,
} from '@iterable/react-native-sdk';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import { Route } from '../constants/routes';
import type { RootStackParamList } from '../types/navigation';

interface IterableAppProps {
  isPortrait: boolean;
  returnToInboxTrigger: boolean;
  setReturnToInboxTrigger: (value: boolean) => void;
  isInboxTab: boolean;
  setIsInboxTab: (value: boolean) => void;
  config: IterableConfig | null;
  initialize: (navigation: BottomTabNavigationProp<RootStackParamList>) => void;
  login: () => void;
  logout: () => void;
  isLoggedIn?: boolean;
  isInitialized?: boolean;
  apiKey?: string;
  setApiKey: (value: string) => void;
  userId?: string;
  setUserId: (value: string) => void;
  email?: string;
  setEmail: (value: string) => void;
  loginInProgress?: boolean;
  setLoginInProgress: (value: boolean) => void;
}

const IterableAppContext = createContext<IterableAppProps>({
  isPortrait: false,
  returnToInboxTrigger: false,
  setReturnToInboxTrigger: () => undefined,
  isInboxTab: false,
  setIsInboxTab: () => undefined,
  config: null,
  initialize: () => undefined,
  login: () => undefined,
  logout: () => undefined,
  isLoggedIn: false,
  isInitialized: false,
  apiKey: undefined,
  setApiKey: () => undefined,
  userId: undefined,
  setUserId: () => undefined,
  email: undefined,
  setEmail: () => undefined,
  loginInProgress: false,
  setLoginInProgress: () => undefined,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const IterableAppProvider: FunctionComponent<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isPortrait } = useDeviceOrientation();
  const [returnToInboxTrigger, setReturnToInboxTrigger] = useState<boolean>(false);
  const [isInboxTab, setIsInboxTab] = useState<boolean>(false);
  const [itblConfig, setItblConfig] = useState<IterableConfig | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | undefined>(process.env.ITBL_API_KEY);
  const [userId, setUserId] = useState<string | undefined>(process.env.ITBL_USER_ID);
  const [email, setEmail] = useState<string | undefined>(process.env.ITBL_EMAIL);
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const getUserId = useCallback(() => userId ?? process.env.ITBL_USER_ID, [userId]);
  const getEmail = useCallback(() => email ?? process.env.ITBL_EMAIL, [userId]);

  const login = useCallback(() => {
    const promises = [];
    const id = userId ?? process.env.ITBL_USER_ID;
    const mail = email ?? process.env.ITBL_EMAIL;

    if (!id && !mail) return Promise.reject('No User ID or Email set');

    setLoginInProgress(true);

    if (id) {
      promises.push(Iterable.setUserId(id));
    }
    if (mail && EMAIL_REGEX.test(mail)) {
      promises.push(Iterable.setEmail(mail));
    }

    return Promise.all(promises).then((resp) => {
      setIsLoggedIn(true);
      setLoginInProgress(false);
      return true;
    });
  }, [email, userId]);

  const initialize = useCallback((navigation: BottomTabNavigationProp<RootStackParamList>) => {
    const config = new IterableConfig();

    config.inAppDisplayInterval = 1.0; // Min gap between in-apps. No need to set this in production.

    config.urlHandler = (url: string) => {
      const routeNames = [Route.Home, Route.ApiList];
      for (const route of routeNames) {
        if (url.includes(route.toLowerCase())) {
          navigation.navigate(route);
          return true;
        }
      }
      return false;
    };

    config.customActionHandler = (action: IterableAction) => {
      Alert.alert('Custom Action Handler', 'actionType: ' + action.type);
      return true;
    };

    config.allowedProtocols = ['app', 'iterable'];

    config.logLevel = IterableLogLevel.info;

    config.inAppHandler = () => IterableInAppShowResponse.show;

    setItblConfig(config);

    const key = apiKey ?? process.env.ITBL_API_KEY;

    if (!key) {
      console.error('No API key found.');
      return Promise.resolve(false);
    }

    // Initialize app
    return Iterable.initialize(key as string, config)
      .then((isSuccessful) => {
        setIsInitialized(isSuccessful);

        if (!isSuccessful) return Promise.reject('`Iterable.initialize` failed');

        if (getUserId() || getEmail()) {
          return login().then(() => isSuccessful);
        }

        return isSuccessful;
      })
      .catch((err) => {
        console.error('`Iterable.initialize` failed with the following error', err);
        setIsInitialized(false);
        setLoginInProgress(false);
        return Promise.reject(err);
      });

    // Initialize app
    // initializeIterable({ config });
  }, []);

  const logout = useCallback(() => {
    Iterable.setEmail(undefined);
    Iterable.setUserId(undefined);
    setIsLoggedIn(false);
  }, []);

  return (
    <IterableAppContext.Provider
      value={{
        isPortrait,
        returnToInboxTrigger,
        setReturnToInboxTrigger,
        isInboxTab,
        setIsInboxTab,
        config: itblConfig,
        initialize,
        login,
        logout,
        isLoggedIn,
        isInitialized,
        apiKey,
        setApiKey,
        userId,
        setUserId,
        email,
        setEmail,
        loginInProgress,
        setLoginInProgress,
      }}
    >
      {children}
    </IterableAppContext.Provider>
  );
};

export const useIterableApp = () => useContext(IterableAppContext);

export default useIterableApp;
