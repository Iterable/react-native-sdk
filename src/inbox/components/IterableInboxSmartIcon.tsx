import { type TextStyle } from 'react-native';

import { IterableInboxIcon } from './IterableInboxIcon';
import { tryLoadVectorIcons } from './IterableInboxIconUtils';

/**
 * Props for the IterableInboxSmartIcon component.
 */
export interface IterableInboxSmartIconProps {
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
 * A smart icon component that attempts to use react-native-vector-icons if available,
 * otherwise falls back to Unicode symbols.
 */
export const IterableInboxSmartIcon = ({
  name,
  style,
}: IterableInboxSmartIconProps) => {
  const VectorIcon = tryLoadVectorIcons();

  if (VectorIcon) {
    return <VectorIcon name={name} style={style} />;
  }

  // Fallback to Unicode symbols
  return <IterableInboxIcon name={name} style={style} />;
};
