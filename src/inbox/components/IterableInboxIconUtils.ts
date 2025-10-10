/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
import { type TextStyle } from 'react-native';

// Type for the vector icon component
type VectorIconComponent = React.ComponentType<{
  name: string;
  style?: TextStyle;
}>;

/**
 * Attempts to load the react-native-vector-icons module.
 * Returns null if the module is not available.
 */
export function tryLoadVectorIcons(): VectorIconComponent | null {
  try {
    return require('react-native-vector-icons/Ionicons').default;
  } catch {
    return null;
  }
}
