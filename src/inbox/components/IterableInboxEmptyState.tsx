import { StyleSheet, Text, View } from 'react-native';

import { type IterableInboxCustomizations } from '../types';
import { ITERABLE_INBOX_COLORS } from '../constants';

// TODO: Comment
export interface IterableInboxEmptyStateProps {
  customizations: IterableInboxCustomizations;
  tabBarHeight: number;
  tabBarPadding: number;
  navTitleHeight: number;
  contentWidth: number;
  height: number;
  isPortrait: boolean;
}

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
      style={[
        styles.container,
        {
          height: isPortrait
            ? height - navTitleHeight - tabBarHeight - tabBarPadding
            : height - navTitleHeight,
        },
      ]}
    >
      <Text style={styles.title}>
        {emptyStateTitle ? emptyStateTitle : defaultTitle}
      </Text>
      <Text style={styles.body}>
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
