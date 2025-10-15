import { Text, View } from 'react-native';
import { useMemo } from 'react';

import { type IterableInboxCustomizations } from '../../types';
import { styles } from './IterableInboxEmptyState.styles';
import { useDeviceOrientation } from '../../../core/hooks/useDeviceOrientation';

export const iterableInboxEmptyStateTestIds = {
  container: 'iterable-inbox-empty-state-container',
  title: 'iterable-inbox-empty-state-title',
  body: 'iterable-inbox-empty-state-body',
} as const;

/**
 * Props for the IterableInboxEmptyState component.
 */
export interface IterableInboxEmptyStateProps {
  /** Customizations for the inbox. */
  customizations?: IterableInboxCustomizations;
  /** Height of the tab bar. */
  tabBarHeight?: number;
  /** Padding of the tab bar. */
  tabBarPadding?: number;
  /** Height of the navigation title. */
  navTitleHeight: number;
}

const defaultTitle = 'No saved messages';
const defaultBody = 'Check again later!';

/**
 * A functional component that renders an empty state for the inbox when there are no messages.
 */
export const IterableInboxEmptyState = ({
  customizations = {} as IterableInboxCustomizations,
  tabBarHeight = 80,
  tabBarPadding = 20,
  navTitleHeight,
}: IterableInboxEmptyStateProps) => {
  const { height, isPortrait } = useDeviceOrientation();
  const containerHeight = useMemo(() => {
    return isPortrait
      ? height - navTitleHeight - tabBarHeight - tabBarPadding
      : height - navTitleHeight;
  }, [height, navTitleHeight, tabBarHeight, tabBarPadding, isPortrait]);

  return (
    <View
      testID={iterableInboxEmptyStateTestIds.container}
      style={[styles.container, { height: containerHeight }]}
    >
      <Text testID={iterableInboxEmptyStateTestIds.title} style={styles.title}>
        {customizations.noMessagesTitle ? customizations.noMessagesTitle : defaultTitle}
      </Text>
      <Text testID={iterableInboxEmptyStateTestIds.body} style={styles.body}>
        {customizations.noMessagesBody ? customizations.noMessagesBody : defaultBody}
      </Text>
    </View>
  );
};
