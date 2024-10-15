import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { Route } from '../constants/routes';

export type RootStackParamList = {
  [Route.Main]: undefined;
  [Route.User]: undefined;
  [Route.Inbox]: undefined;
  [Route.Commerce]: undefined;
  [Route.Apis]: undefined;
  [Route.ApiList]: undefined;
  [Route.ApiDetail]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  BottomTabScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
