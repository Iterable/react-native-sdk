export interface IterableEmbeddedViewConfigDict {
  /** Background color hex (e.g., 0xFF0000) */
  backgroundColor?: number | null;
  /** Border color hex */
  borderColor?: number | null;
  /** Border width in pixels */
  borderWidth?: number | null;
  /** Corner radius in points */
  borderCornerRadius?: number | null;
  /** Primary button background color hex */
  primaryBtnBackgroundColor?: number | null;
  /** Primary button text color hex */
  primaryBtnTextColor?: number | null;
  /** Secondary button background color hex */
  secondaryBtnBackgroundColor?: number | null;
  /** Secondary button text color hex */
  secondaryBtnTextColor?: number | null;
  /** Title text color hex */
  titleTextColor?: number | null;
  /** Body text color hex */
  bodyTextColor?: number | null;
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
      backgroundColor = null,
      borderColor = null,
      borderWidth = null,
      borderCornerRadius = null,
      primaryBtnBackgroundColor = null,
      primaryBtnTextColor = null,
      secondaryBtnBackgroundColor = null,
      secondaryBtnTextColor = null,
      titleTextColor = null,
      bodyTextColor = null,
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
