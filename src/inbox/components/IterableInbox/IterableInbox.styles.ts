import { Platform, StyleSheet } from "react-native";
import { ITERABLE_INBOX_COLORS } from "../../constants";
import { ANDROID_HEADLINE_HEIGHT, DEFAULT_HEADLINE_HEIGHT } from "./constants";

export const styles = StyleSheet.create({
  animatedView: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  headline: {
    backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
    fontSize: 40,
    fontWeight: 'bold',
    height:
      Platform.OS === 'android'
        ? ANDROID_HEADLINE_HEIGHT
        : DEFAULT_HEADLINE_HEIGHT,
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },

  loadingScreen: {
    backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
    height: '100%',
  },

  messageListContainer: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
  },
});
