import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import { Route } from '../constants/routes';

export type MainScreenParamList = {
  [Route.User]: undefined;
};

export type RootStackParamList = {
  [Route.Main]: NavigatorScreenParams<MainScreenParamList>;
  [Route.Login]: undefined;
};

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
