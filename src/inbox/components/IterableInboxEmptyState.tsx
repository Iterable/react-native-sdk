import { StyleSheet, Text, View } from 'react-native';

import { type IterableInboxCustomizations } from '../types';

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

  const { title, body } = styles;
  let { container } = styles;

  container = {
    ...container,
    height: height - navTitleHeight - tabBarHeight - tabBarPadding,
  };

  if (!isPortrait) {
    container = { ...container, height: height - navTitleHeight };
  }

  return (
    <View style={container}>
      <Text style={title}>
        {emptyStateTitle ? emptyStateTitle : defaultTitle}
      </Text>
      <Text style={body}>{emptyStateBody ? emptyStateBody : defaultBody}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    color: 'grey',
    fontSize: 15,
  },

  container: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
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
