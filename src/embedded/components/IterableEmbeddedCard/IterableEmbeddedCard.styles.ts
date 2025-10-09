import { StyleSheet } from 'react-native';
import { embeddedMediaImageBackgroundColors } from '../../constants/embeddedViewDefaults';

const IMAGE_HEIGHT = 230;

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
      '0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 0 2px 0 rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  mediaContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: embeddedMediaImageBackgroundColors.card,
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
    height: 56,
    opacity: 0.25,
    width: 56,
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
