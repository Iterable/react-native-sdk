import { createNavigationContainerRef } from '@react-navigation/native';

import type { RootStackParamList } from './types/navigation';

/**
 * Lets code outside a screen (e.g. the Iterable `urlHandler`) navigate. A
 * screen's `navigation` prop goes stale once that screen unmounts (the Login
 * screen unmounts on login), so deep links must not use it.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
