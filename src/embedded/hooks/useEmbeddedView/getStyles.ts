import type { IterableEmbeddedViewConfig } from '../../types/IterableEmbeddedViewConfig';
import { embeddedStyles } from './embeddedViewDefaults';
import { IterableEmbeddedViewType } from '../../enums';

/**
 * Get the default style for the embedded view type.
 *
 * @param viewType - The type of view to render.
 * @param colors - The colors to use for the default style.
 * @returns The default style.
 */
const getDefaultStyle = (
  viewType: IterableEmbeddedViewType,
  colors: {
    banner: number | string;
    card: number | string;
    notification: number | string;
  }
) => {
  switch (viewType) {
    case IterableEmbeddedViewType.Notification:
      return colors.notification;
    case IterableEmbeddedViewType.Card:
      return colors.card;
    default:
      return colors.banner;
  }
};

/**
 * Get the style for the embedded view type.
 *
 * If a style is provided in the config, it will take precedence over the default style.
 *
 * @param viewType - The type of view to render.
 * @param c - The config to use for the styles.
 * @returns The styles.
 *
 * @example
 * const styles = getStyles(IterableEmbeddedViewType.Notification, {
 *   backgroundColor: '#000000',
 *   borderColor: '#000000',
 *   borderWidth: 1,
 *   borderCornerRadius: 10,
 *   primaryBtnBackgroundColor: '#000000',
 *   primaryBtnTextColor: '#000000',
 * });
 */
export const getStyles = (
  viewType: IterableEmbeddedViewType,
  c?: IterableEmbeddedViewConfig | null
) => {
  return {
    backgroundColor:
      c?.backgroundColor ??
      getDefaultStyle(viewType, embeddedStyles.backgroundColor),
    borderColor:
      c?.borderColor ?? getDefaultStyle(viewType, embeddedStyles.borderColor),
    borderWidth:
      c?.borderWidth ?? getDefaultStyle(viewType, embeddedStyles.borderWidth),
    borderCornerRadius:
      c?.borderCornerRadius ??
      getDefaultStyle(viewType, embeddedStyles.borderCornerRadius),
    primaryBtnBackgroundColor:
      c?.primaryBtnBackgroundColor ??
      getDefaultStyle(viewType, embeddedStyles.primaryBtnBackgroundColor),
    primaryBtnTextColor:
      c?.primaryBtnTextColor ??
      getDefaultStyle(viewType, embeddedStyles.primaryBtnTextColor),
    secondaryBtnBackgroundColor:
      c?.secondaryBtnBackgroundColor ??
      getDefaultStyle(viewType, embeddedStyles.secondaryBtnBackground),
    secondaryBtnTextColor:
      c?.secondaryBtnTextColor ??
      getDefaultStyle(viewType, embeddedStyles.secondaryBtnTextColor),
    titleTextColor:
      c?.titleTextColor ?? getDefaultStyle(viewType, embeddedStyles.titleText),
    bodyTextColor:
      c?.bodyTextColor ?? getDefaultStyle(viewType, embeddedStyles.bodyText),
  };
};
