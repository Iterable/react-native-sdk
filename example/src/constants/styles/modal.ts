import type { TextStyle, ViewStyle } from 'react-native';
import { colors } from './colors';

export const modalTitle: TextStyle = {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 12,
  textAlign: 'center',
};

export const modalOverlay: ViewStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  flex: 1,
  justifyContent: 'center',
  padding: 20,
};

export const modalContent: ViewStyle = {
  backgroundColor: colors.backgroundPrimary,
  borderRadius: 12,
  maxHeight: '80%',
  padding: 16,
};

export const modalButtons: ViewStyle = {
  flexDirection: 'row',
  gap: 12,
  justifyContent: 'flex-end',
};

export const modalButton: ViewStyle = {
  flex: 1,
};

export const modalButtonText: TextStyle = {
  color: colors.brandCyan,
  fontSize: 14,
  fontWeight: '600',
};

export const modalButtonTextSelected: TextStyle = {
  color: colors.backgroundPrimary,
};
