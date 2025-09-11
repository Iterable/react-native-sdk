import { StyleSheet, Text, View } from 'react-native';

import { type IterableInboxCustomizations } from '../types';
import { ITERABLE_INBOX_COLORS } from '../constants';

/**
 * Props for the IterableInboxEmptyState component.
 */
export interface IterableInboxEmptyStateProps {
  /** Customizations for the inbox. */
  customizations: IterableInboxCustomizations;
  /** Height of the tab bar. */
  tabBarHeight: number;
  /** Padding of the tab bar. */
  tabBarPadding: number;
  /** Height of the navigation title. */
  navTitleHeight: number;
  /** Width of the content area. */
  contentWidth: number;
  /** Height of the component. */
  height: number;
  /** Indicates if the device is in portrait mode. */
  isPortrait: boolean;
}

export const inboxEmptyStateTestIDs = {
  container: 'inbox-empty-state',
  title: 'inbox-empty-state-title',
  body: 'inbox-empty-state-body',
} as const;

/**
 * A functional component that renders an empty state for the inbox when there are no messages.
 */
export const IterableInboxEmptyState = ({
  customizations,
  tabBarHeight,
  tabBarPadding,
  navTitleHeight,
  height,
  isPortrait,
}: IterableInboxEmptyStateProps) => {
  const defaultTitle = 'No saved messages';
  const defaultBody = 'Check again later!';

  const emptyStateTitle = customizations.noMessagesTitle;
  const emptyStateBody = customizations.noMessagesBody;

  return (
    <View
      testID={inboxEmptyStateTestIDs.container}
      style={[
        styles.container,
        {
          height: isPortrait
            ? height - navTitleHeight - tabBarHeight - tabBarPadding
            : height - navTitleHeight,
        },
      ]}
    >
      <Text testID={inboxEmptyStateTestIDs.title} style={styles.title}>
        {emptyStateTitle ? emptyStateTitle : defaultTitle}
      </Text>
      <Text testID={inboxEmptyStateTestIDs.body}  style={styles.body}>
        {emptyStateBody ? emptyStateBody : defaultBody}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    color: ITERABLE_INBOX_COLORS.TEXT,
    fontSize: 15,
  },

  container: {
    alignItems: 'center',
    backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
    flexDirection: 'column',
    height: 0,
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 25,
  },
});
