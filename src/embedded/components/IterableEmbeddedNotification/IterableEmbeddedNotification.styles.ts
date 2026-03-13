import { StyleSheet } from 'react-native';

const SHADOW_COLOR = 'rgba(0, 0, 0, 0.06)';

export const styles = StyleSheet.create({
  body: {
    alignSelf: 'stretch',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    gap: 4,
    width: '100%',
  },
  button: {
    borderRadius: 32,
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  container: {
    alignItems: 'flex-start',
    borderStyle: 'solid',
    boxShadow:
      `0 1px 1px 0 ${SHADOW_COLOR}, 0 0 2px 0 ${SHADOW_COLOR}, 0 0 1px 0 ${SHADOW_COLOR}`,
    display: 'flex',
    elevation: 1,
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    padding: 16,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});
