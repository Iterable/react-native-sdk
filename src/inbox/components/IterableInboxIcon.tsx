import { Text, StyleSheet, type TextStyle } from 'react-native';

/**
 * Props for the IterableInboxIcon component.
 */
export interface IterableInboxIconProps {
  /**
   * The name of the icon to display.
   */
  name: string;
  /**
   * The style to apply to the icon.
   */
  style?: TextStyle;
}

/**
 * A fallback icon component that uses Unicode symbols instead of vector icons.
 * This allows the inbox to work without requiring react-native-vector-icons.
 */
export const IterableInboxIcon = ({ name, style }: IterableInboxIconProps) => {
  // Map of common icon names to Unicode symbols
  const iconMap: Record<string, string> = {
    'chevron-back-outline': '‹',
    'chevron-back': '‹',
    'arrow-back': '←',
    'back': '←',
  };

  const iconSymbol = iconMap[name] || '?';

  return <Text style={[styles.icon, style]}>{iconSymbol}</Text>;
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
