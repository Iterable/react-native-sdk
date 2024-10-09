import type { TextStyle } from 'react-native';
import { colors } from './colors';

export const appName: TextStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 14,
  width: '100%',
  marginTop: 41,
  marginBottom: 64,
  textTransform: 'uppercase',
  letterSpacing: 2,
  color: colors.textPrimary,
};

export const appNameSmall: TextStyle = {
  ...appName,
  fontSize: 10,
  marginTop: 10,
  marginBottom: 25,
};

export const title: TextStyle = {
  color: colors.textPrimary,
  fontWeight: '700',
  fontSize: 24,
  lineHeight: 28,
  letterSpacing: -0.25,
  marginBottom: 12,
};

export const subtitle: TextStyle = {
  color: colors.textSecondary,
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  marginBottom: 20,
  fontWeight: '400',
};

export const appNameSmallSubtitle: TextStyle = {
  ...subtitle,
  fontSize: 10,
  marginBottom: 25,
};

export const label: TextStyle = {
  fontWeight: '500',
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  color: colors.textPrimary,
  marginBottom: 4,
};
