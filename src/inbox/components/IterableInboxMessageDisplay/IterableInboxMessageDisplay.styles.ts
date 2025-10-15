import { StyleSheet } from "react-native";
import { ITERABLE_INBOX_COLORS } from "../../constants";

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  messageDisplayContainer: {
    backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
  },

  messageTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  messageTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 0,
    width: '75%',
  },

  messageTitleText: {
    backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
    fontSize: 20,
    fontWeight: 'bold',
  },

  returnButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  returnButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 0,
    marginTop: 0,
    width: '25%',
  },

  returnButtonIcon: {
    color: ITERABLE_INBOX_COLORS.BUTTON_PRIMARY_TEXT,
    fontSize: 40,
    paddingLeft: 0,
  },

  returnButtonText: {
    color: ITERABLE_INBOX_COLORS.BUTTON_PRIMARY_TEXT,
    fontSize: 20,
  },
});
