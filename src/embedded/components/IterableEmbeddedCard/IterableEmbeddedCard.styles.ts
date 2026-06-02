import { StyleSheet } from 'react-native';

export const IMAGE_HEIGHT = 230;
export const PLACEHOLDER_IMAGE_HEIGHT = 56;
export const PLACEHOLDER_IMAGE_WIDTH = 56;
const SHADOW_COLOR_LIGHT = 'rgba(0, 0, 0, 0.06)';
const SHADOW_COLOR_DARK = 'rgba(0, 0, 0, 0.08)';
const IMAGE_BACKGROUND_COLOR = '#F5F4F4';

export const styles = StyleSheet.create({
  body: {
    alignSelf: 'stretch',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodyContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  button: {
    borderRadius: 32,
    gap: 8,
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
    alignItems: 'center',
    borderStyle: 'solid',
    boxShadow:
      `0 1px 1px 0 ${SHADOW_COLOR_LIGHT}, 0 0 2px 0 ${SHADOW_COLOR_LIGHT}, 0 0 1px 0 ${SHADOW_COLOR_DARK}`,
    display: 'flex',
    elevation: 1,
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: SHADOW_COLOR_LIGHT,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    width: '100%',
  },
  mediaContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: IMAGE_BACKGROUND_COLOR,
    display: 'flex',
    flexDirection: 'row',
    height: IMAGE_HEIGHT,
  },
  mediaContainerNoImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaImage: {
    height: IMAGE_HEIGHT,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '100%',
  },
  mediaImagePlaceholder: {
    height: PLACEHOLDER_IMAGE_HEIGHT,
    opacity: 0.25,
    width: PLACEHOLDER_IMAGE_WIDTH,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
