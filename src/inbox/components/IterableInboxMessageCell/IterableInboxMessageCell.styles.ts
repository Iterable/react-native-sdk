import { StyleSheet } from "react-native";
import { ITERABLE_INBOX_COLORS } from "../../constants";

export const styles = StyleSheet.create({
  deleteSlider: {
    alignItems: 'center',
    backgroundColor: ITERABLE_INBOX_COLORS.DESTRUCTIVE,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    position: 'absolute',
    width: '100%',
  },

  textContainer: {
    elevation: 2,
    width: '100%',
  },

  textStyle: {
    color: ITERABLE_INBOX_COLORS.TEXT_INVERSE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
