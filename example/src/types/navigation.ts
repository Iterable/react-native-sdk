import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';

import { Route } from '../constants/routes';

export type RootStackParamList = Record<Route, undefined>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = BottomTabScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
