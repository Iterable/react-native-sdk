import { StyleSheet } from 'react-native';
import { ITERABLE_INBOX_COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  body: {
    color: ITERABLE_INBOX_COLORS.TEXT_MUTED,
    flexWrap: 'wrap',
    fontSize: 15,
    paddingBottom: 10,
    width: '85%',
  },

  createdAt: {
    color: ITERABLE_INBOX_COLORS.TEXT_MUTED,
    fontSize: 12,
  },

  landscapeMessageContainer: {
    width: '90%',
  },

  messageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    width: '75%',
  },

  messageRow: {
    backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND_LIGHT,
    borderColor: ITERABLE_INBOX_COLORS.BORDER,
    borderStyle: 'solid',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 150,
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },

  readMessageThumbnailContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 30,
  },

  thumbnail: {
    height: 80,
    width: 80,
  },

  title: {
    fontSize: 22,
    paddingBottom: 10,
    width: '85%',
  },

  unreadIndicator: {
    backgroundColor: ITERABLE_INBOX_COLORS.UNREAD,
    borderRadius: 15 / 2,
    height: 15,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    width: 15,
  },

  unreadIndicatorContainer: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
  },

  unreadMessageThumbnailContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
