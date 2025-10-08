import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  body: {
    alignSelf: 'stretch',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodyContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    // backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row',
    // gap: 16,
  },
  button: {
    // backgroundColor: 'blue',
    borderRadius: 12,
    gap: 8,
    // height: 32,
    // display: 'flex',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  container: {
    alignItems: 'flex-start',
    borderStyle: 'solid',
    boxShadow:
      '0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 0 2px 0 rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },
  mediaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  textContainer: {
    alignSelf: 'center',
    // alignItems: 'flex-start',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    gap: 4,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});
