import type { IterableEmbeddedViewConfig } from '../types/IterableEmbeddedViewConfig';
import { embeddedStyles } from '../constants/embeddedViewDefaults';
import type { IterableEmbeddedViewType } from '../enums';
import { getDefaultStyle } from './getDefaultStyle';

export const getStyles = (
  viewType: IterableEmbeddedViewType,
  c?: IterableEmbeddedViewConfig | null
) => {
  return {
    backgroundColor:
      c?.backgroundColor ??
      getDefaultStyle(viewType, embeddedStyles.background),
    borderColor:
      c?.borderColor ?? getDefaultStyle(viewType, embeddedStyles.border),
    borderWidth:
      c?.borderWidth ?? getDefaultStyle(viewType, embeddedStyles.borderWidth),
    borderCornerRadius:
      c?.borderCornerRadius ??
      getDefaultStyle(viewType, embeddedStyles.borderRadius),
    primaryBtnBackgroundColor:
      c?.primaryBtnBackgroundColor ??
      getDefaultStyle(viewType, embeddedStyles.primaryBtnBackground),
    primaryBtnTextColor:
      c?.primaryBtnTextColor ??
      getDefaultStyle(viewType, embeddedStyles.primaryBtnText),
    secondaryBtnBackgroundColor:
      c?.secondaryBtnBackgroundColor ??
      getDefaultStyle(viewType, embeddedStyles.secondaryBtnBackground),
    secondaryBtnTextColor:
      c?.secondaryBtnTextColor ??
      getDefaultStyle(viewType, embeddedStyles.secondaryBtnText),
    titleTextColor:
      c?.titleTextColor ?? getDefaultStyle(viewType, embeddedStyles.titleText),
    bodyTextColor:
      c?.bodyTextColor ?? getDefaultStyle(viewType, embeddedStyles.bodyText),
  };
};
