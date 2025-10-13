import type { ColorValue } from 'react-native';

/**
 * Represents view-level styling configuration for an embedded view.
 */
export interface IterableEmbeddedViewConfig {
  /** Background color hex (e.g., 0xFF0000) */
  backgroundColor?: ColorValue;
  /** Border color hex */
  borderColor?: ColorValue;
  /** Border width in pixels */
  borderWidth?: number;
  /** Corner radius in points */
  borderCornerRadius?: number;
  /** Primary button background color hex */
  primaryBtnBackgroundColor?: ColorValue;
  /** Primary button text color hex */
  primaryBtnTextColor?: ColorValue;
  /** Secondary button background color hex */
  secondaryBtnBackgroundColor?: ColorValue;
  /** Secondary button text color hex */
  secondaryBtnTextColor?: ColorValue;
  /** Title text color hex */
  titleTextColor?: ColorValue;
  /** Body text color hex */
  bodyTextColor?: ColorValue;
}
