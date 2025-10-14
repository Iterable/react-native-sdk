import { StyleSheet, Platform } from 'react-native';
import {
  embeddedMediaImageBackgroundColors,
  embeddedMediaImageBorderColors,
} from '../../constants/embeddedViewDefaults';

// See https://support.iterable.com/hc/en-us/articles/23230946708244-Out-of-the-Box-Views-for-Embedded-Messages#banners
export const IMAGE_HEIGHT = Platform.OS === 'android' ? 80 : 100;
export const IMAGE_WIDTH = Platform.OS === 'android' ? 80 : 100;

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
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 4,
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
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
  },
  mediaImage: {
    backgroundColor: embeddedMediaImageBackgroundColors.banner,
    borderColor: embeddedMediaImageBorderColors.banner,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    height: IMAGE_HEIGHT,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: IMAGE_WIDTH,
  },
  textContainer: {
    alignSelf: 'center',
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
    lineHeight: 16,
    paddingBottom: 4,
  },
});
