import { Text, View } from 'react-native';

import { styles } from './EmbeddedSessionDevWarning.styles';

interface EmbeddedSessionDevWarningProps {
  /** When true, shows the dev-only banner. */
  visible: boolean;
  /** Name of the component (for the message). */
  componentName: string;
}

/**
 * Banner when embedded views are not wrapped in EmbeddedSessionManager`.
 */
export const EmbeddedSessionDevWarning = ({
  visible,
  componentName,
}: EmbeddedSessionDevWarningProps) => {
  if (!visible) {
    return null;
  }

  const message = `[Iterable] ${componentName}: wrap this component in <EmbeddedSessionManager> so embedded session tracking works correctly.`;

  return (
    <View
      style={styles.banner}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
