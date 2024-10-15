import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import { Route } from '../constants/routes';
import type { ApiData } from './api';

export type ApiTabParamList = {
  [Route.ApiList]: undefined;
  [Route.ApiDetail]: ApiData;
};

export type MainScreenParamList = {
  [Route.Inbox]: undefined;
  [Route.Commerce]: undefined;
  [Route.Apis]: NavigatorScreenParams<ApiTabParamList>;
  [Route.User]: undefined;
};

export type RootStackParamList = {
  [Route.Main]: NavigatorScreenParams<MainScreenParamList>;
  [Route.Login]: undefined;
};

export type ApiTabProps<T extends keyof ApiTabParamList> = CompositeScreenProps<
  StackScreenProps<ApiTabParamList, T>,
  MainScreenProps<Route.Apis>
>;

export type MainScreenProps<T extends keyof MainScreenParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainScreenParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
