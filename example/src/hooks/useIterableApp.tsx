import type { StackNavigationProp } from '@react-navigation/stack';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FunctionComponent,
} from 'react';
import { Alert } from 'react-native';

import {
  Iterable,
  IterableAction,
  IterableConfig,
  IterableInAppShowResponse,
  IterableLogLevel,
  IterableRetryBackoff,
  IterableAuthFailureReason,
} from '@iterable/react-native-sdk';

import { Route } from '../constants/routes';
import type { RootStackParamList } from '../types/navigation';
import NativeJwtTokenModule from '../utility/NativeJwtTokenModule';

type Navigation = StackNavigationProp<RootStackParamList>;

interface IterableAppProps {
  /** The API key for your Iterable instance */
  apiKey?: string;
  /** The configuration of the RN SDK */
  config: IterableConfig | null;
  /**
   * Call to initialize the Iterable SDK
   * @param navigation - The navigation prop from the screen
   * @returns Promise<boolean> Whether the initialization was successful
   */
  initialize: (navigation: Navigation) => void;
  /** Whether the SDK has been initialized */
  isInitialized?: boolean;
  /** Is the tab in focus the `Inbox` tab? */
  isInboxTab: boolean;
  /** Whether the user is logged in */
  isLoggedIn?: boolean;
  /**
   * Call to log in the user
   * @returns Promise<boolean> Whether the login was successful
   */
  login: () => void;
  /** Whether the login is in progress */
  loginInProgress?: boolean;
  /** Logs the user out */
  logout: () => void;
  /** Should the iterable inbox return to the list of messages? */
  returnToInboxTrigger: boolean;
  /** Sets the API key for the user */
  setApiKey: (value: string) => void;
  /** Sets whether the tab in focus is the `Inbox` tab */
  setIsInboxTab: (value: boolean) => void;
  /** Sets whether the login is in progress */
  setLoginInProgress: (value: boolean) => void;
  /** Sets whether the iterable inbox should return to the list of messages */
  setReturnToInboxTrigger: (value: boolean) => void;
  /** Sets the user ID for the user */
  setUserId: (value: string) => void;
  /** The user ID for the user */
  userId?: string | null;
}

const IterableAppContext = createContext<IterableAppProps>({
  apiKey: undefined,
  config: null,
  initialize: () => undefined,
  isInboxTab: false,
  isInitialized: false,
  isLoggedIn: false,
  login: () => undefined,
  loginInProgress: false,
  logout: () => undefined,
  returnToInboxTrigger: false,
  setApiKey: () => undefined,
  setIsInboxTab: () => undefined,
  setLoginInProgress: () => undefined,
  setReturnToInboxTrigger: () => undefined,
  setUserId: () => undefined,
  userId: null,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getIsEmail = (id: string) => EMAIL_REGEX.test(id);

export const IterableAppProvider: FunctionComponent<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  console.log('process.env.ITBL_JWT_SECRET', process.env.ITBL_JWT_SECRET);
  console.log('process.env.ITBL_ID', process.env.ITBL_ID);
  console.log(
    'process.env.ITBL_IS_JWT_ENABLED',
    process.env.ITBL_IS_JWT_ENABLED
  );
  console.log('process.env.ITBL_API_KEY', process.env.ITBL_API_KEY);
  const [returnToInboxTrigger, setReturnToInboxTrigger] =
    useState<boolean>(false);
  const [isInboxTab, setIsInboxTab] = useState<boolean>(false);
  const [itblConfig, setItblConfig] = useState<IterableConfig | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | undefined>(
    process.env.ITBL_API_KEY
  );
  const [userId, setUserId] = useState<string | null>(
    process.env.ITBL_ID ?? null
  );
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const getUserId = useCallback(() => userId ?? process.env.ITBL_ID, [userId]);

  const getJwtToken = useCallback(async () => {
    const id = userId ?? process.env.ITBL_ID;
    const idType = getIsEmail(id as string) ? 'email' : 'userId';
    const secret = process.env.ITBL_JWT_SECRET ?? '';
    const duration = 1000 * 60 * 60 * 24; // 1 day in milliseconds
    const jwtToken = await NativeJwtTokenModule.generateJwtToken(
      secret,
      duration,
      idType === 'email' ? (id as string) : null, // Email (can be null if userId is provided)
      idType === 'userId' ? (id as string) : null // UserId (can be null if email is provided)
    );

    return jwtToken;
  }, [userId]);

  const login = useCallback(() => {
    const id = userId ?? process.env.ITBL_ID;

    if (!id) return Promise.reject('No User ID or Email set');

    setLoginInProgress(true);

    const fn = getIsEmail(id) ? Iterable.setEmail : Iterable.setUserId;

    fn(id, process.env.ITBL_JWT_SECRET);
    setIsLoggedIn(true);
    setLoginInProgress(false);

    return Promise.resolve(true);
  }, [userId]);

  const initialize = useCallback(
    (navigation: Navigation) => {
      const config = new IterableConfig();

      config.inAppDisplayInterval = 1.0; // Min gap between in-apps. No need to set this in production.

      config.retryPolicy = {
        maxRetry: 5,
        retryInterval: 10,
        retryBackoff: IterableRetryBackoff.LINEAR,
      };

      config.onJWTError = (authFailure) => {
        console.log('onJWTError', authFailure);

        const failureReason =
          typeof authFailure.failureReason === 'string'
            ? authFailure.failureReason
            : IterableAuthFailureReason[authFailure.failureReason];

        Alert.alert(
          `Error fetching JWT: ${failureReason}`,
          `Token: ${authFailure.failedAuthToken}`
        );
      };

      config.urlHandler = (url: string) => {
        const routeNames = [Route.Commerce, Route.Inbox, Route.User];
        for (const route of routeNames) {
          if (url.includes(route.toLowerCase())) {
            // [MOB-10418](https://iterable.atlassian.net/browse/MOB-10418): Figure out typing for this
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

      console.log('getJwtToken', getJwtToken());

      if (
        process.env.ITBL_IS_JWT_ENABLED === 'true' &&
        process.env.ITBL_JWT_SECRET
      ) {
        console.log('CONFIGURED AUTH HANDLER');
        config.authHandler = async () => {
          console.log(`authHandler`);

          const token = await getJwtToken();

          console.log(`🚀 > IterableAppProvider > token:`, token);

          return Promise.resolve({
            // authToken: 'SomethingNotValid',
            authToken: token,
            successCallback: () => {
              console.log(`authHandler > success`);
            },
            // This is not firing
            failureCallback: () => {
              console.log(`authHandler > failure`);
            },
          });
        };
      }

      setItblConfig(config);
      console.log(`🚀 > IterableAppProvider > config:`, config);

      const key = apiKey ?? process.env.ITBL_API_KEY;

      if (!key) {
        console.error('No API key found.');
        return Promise.resolve(false);
      }

      // Initialize app
      return Iterable.initialize(key, config)
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
          // MOB-10419: Find out why initialize is throwing an error on ios
          setIsInitialized(true);
          if (getUserId()) {
            login();
          }
          return Promise.resolve(true);
        });
    },
    [apiKey, getUserId, login, getJwtToken]
  );

  const logout = useCallback(() => {
    Iterable.setEmail(null);
    Iterable.setUserId(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <IterableAppContext.Provider
      value={{
        apiKey,
        config: itblConfig,
        initialize,
        isInboxTab,
        isInitialized,
        isLoggedIn,
        login,
        loginInProgress,
        logout,
        returnToInboxTrigger,
        setApiKey,
        setIsInboxTab,
        setLoginInProgress,
        setReturnToInboxTrigger,
        setUserId,
        userId,
      }}
    >
      {children}
    </IterableAppContext.Provider>
  );
};

export const useIterableApp = () => useContext(IterableAppContext);

export default useIterableApp;
