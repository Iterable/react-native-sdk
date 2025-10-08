import type { ColorValue } from 'react-native';

export interface IterableEmbeddedViewConfigDict {
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

/**
 * Represents view-level styling configuration for an embedded view.
 */
export class IterableEmbeddedViewConfig {
  public backgroundColor?: IterableEmbeddedViewConfigDict['backgroundColor'];
  public borderColor?: IterableEmbeddedViewConfigDict['borderColor'];
  public borderWidth?: IterableEmbeddedViewConfigDict['borderWidth'];
  public borderCornerRadius?: IterableEmbeddedViewConfigDict['borderCornerRadius'];
  public primaryBtnBackgroundColor?: IterableEmbeddedViewConfigDict['primaryBtnBackgroundColor'];
  public primaryBtnTextColor?: IterableEmbeddedViewConfigDict['primaryBtnTextColor'];
  public secondaryBtnBackgroundColor?: IterableEmbeddedViewConfigDict['secondaryBtnBackgroundColor'];
  public secondaryBtnTextColor?: IterableEmbeddedViewConfigDict['secondaryBtnTextColor'];
  public titleTextColor?: IterableEmbeddedViewConfigDict['titleTextColor'];
  public bodyTextColor?: IterableEmbeddedViewConfigDict['bodyTextColor'];

  constructor(options: IterableEmbeddedViewConfigDict = {}) {
    const {
      backgroundColor,
      borderColor,
      borderWidth,
      borderCornerRadius,
      primaryBtnBackgroundColor,
      primaryBtnTextColor,
      secondaryBtnBackgroundColor,
      secondaryBtnTextColor,
      titleTextColor,
      bodyTextColor,
    } = options;

    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.borderCornerRadius = borderCornerRadius;
    this.primaryBtnBackgroundColor = primaryBtnBackgroundColor;
    this.primaryBtnTextColor = primaryBtnTextColor;
    this.secondaryBtnBackgroundColor = secondaryBtnBackgroundColor;
    this.secondaryBtnTextColor = secondaryBtnTextColor;
    this.titleTextColor = titleTextColor;
    this.bodyTextColor = bodyTextColor;
  }
}
