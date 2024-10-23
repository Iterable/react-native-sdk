import { Platform, type ViewStyle } from 'react-native';

export const container: ViewStyle = {
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: 16,
  marginTop: Platform.OS === 'android' ? 0 : 50,
};
