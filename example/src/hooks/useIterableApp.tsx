import {
  Iterable,
  IterableAction,
  IterableConfig,
  IterableInAppShowResponse,
  IterableLogLevel,
  useDeviceOrientation,
} from '@iterable/react-native-sdk';

import {
  type FunctionComponent,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Alert } from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '../constants/routes';
import type { RootStackParamList } from '../types/navigation';

type Navigation = StackNavigationProp<RootStackParamList>;

interface IterableAppProps {
  isPortrait: boolean;
  returnToInboxTrigger: boolean;
  setReturnToInboxTrigger: (value: boolean) => void;
  isInboxTab: boolean;
  setIsInboxTab: (value: boolean) => void;
  config: IterableConfig | null;
  initialize: (navigation: Navigation) => void;
  login: () => void;
  logout: () => void;
  isLoggedIn?: boolean;
  isInitialized?: boolean;
  apiKey?: string;
  setApiKey: (value: string) => void;
  userId?: string;
  setUserId: (value: string) => void;
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
  loginInProgress: false,
  setLoginInProgress: () => undefined,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const IterableAppProvider: FunctionComponent<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const { isPortrait } = useDeviceOrientation();
  const [returnToInboxTrigger, setReturnToInboxTrigger] =
    useState<boolean>(false);
  const [isInboxTab, setIsInboxTab] = useState<boolean>(false);
  const [itblConfig, setItblConfig] = useState<IterableConfig | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | undefined>(
    process.env.ITBL_API_KEY
  );
  const [userId, setUserId] = useState<string | undefined>(process.env.ITBL_ID);
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const getUserId = useCallback(() => userId ?? process.env.ITBL_ID, [userId]);

  const login = useCallback(() => {
    const id = userId ?? process.env.ITBL_ID;

    if (!id) return Promise.reject('No User ID or Email set');

    setLoginInProgress(true);

    const isEmail = EMAIL_REGEX.test(id);
    const fn = isEmail ? Iterable.setEmail : Iterable.setUserId;

    fn(id);
    setIsLoggedIn(true);
    setLoginInProgress(false);

    return Promise.resolve(true);
  }, [userId]);

  const initialize = useCallback(
    (navigation: Navigation) => {
      const config = new IterableConfig();

      config.inAppDisplayInterval = 1.0; // Min gap between in-apps. No need to set this in production.

      config.urlHandler = (url: string) => {
        const routeNames = [
          Route.User,
          Route.Inbox,
          Route.Commerce,
          Route.Apis,
        ];
        for (const route of routeNames) {
          if (url.includes(route.toLowerCase())) {
            // TODO: Figure out typing for this
            // @ts-ignore
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

      config.logLevel = IterableLogLevel.debug;

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

          if (!isSuccessful)
            return Promise.reject('`Iterable.initialize` failed');

          if (getUserId()) {
            login();
          }

          return isSuccessful;
        })
        .catch((err) => {
          console.error(
            '`Iterable.initialize` failed with the following error',
            err
          );
          setIsInitialized(false);
          setLoginInProgress(false);
          return Promise.reject(err);
        })
        .finally(() => {
          // For some reason, ios is throwing an error on initialize.
          // To temporarily fix this, we're using the finally block to login.
          // TODO: Find out why initialize is throwing an error on ios
          setIsInitialized(true);
          if (getUserId()) {
            login();
          }
          return Promise.resolve(true);
        });
    },
    [apiKey, getUserId, login]
  );

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
