import { StyleSheet } from "react-native";
import { ITERABLE_INBOX_COLORS } from "../../constants";

export const styles = StyleSheet.create({
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
