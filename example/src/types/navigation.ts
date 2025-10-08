import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import { Route } from '../constants/routes';

export type MainScreenParamList = {
  [Route.Commerce]: undefined;
  [Route.Inbox]: undefined;
  [Route.Embedded]: undefined;
  [Route.User]: undefined;
};

export type RootStackParamList = {
  [Route.Login]: undefined;
  [Route.Main]: NavigatorScreenParams<MainScreenParamList>;
};

export type MainScreenProps<T extends keyof MainScreenParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainScreenParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type { RootStackParamList as RootParamList };
