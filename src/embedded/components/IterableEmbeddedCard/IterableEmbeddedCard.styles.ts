import { StyleSheet } from 'react-native';
import {
  embeddedMediaImageBorderColors,
  embeddedMediaImageBackgroundColors,
} from '../../constants/embeddedViewDefaults';

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
    backgroundColor: embeddedMediaImageBackgroundColors.card,
    borderColor: embeddedMediaImageBorderColors.card,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 70,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 70,
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
