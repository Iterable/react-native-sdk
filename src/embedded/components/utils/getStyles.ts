import type { IterableEmbeddedViewConfig } from '../../classes/IterableEmbeddedViewConfig';
import {
  defaultBorderWidth,
  defaultBorderCornerRadius,
  embeddedColors,
} from '../../constants/embeddedViewDefaults';
import type { IterableEmbeddedViewType } from '../../enums/IterableEmbeddedViewType';
import { getDefaultColor } from './getDefaultColor';

export const getStyles = (
  viewType: IterableEmbeddedViewType,
  c?: IterableEmbeddedViewConfig | null
) => {
  return {
    backgroundColor:
      c?.backgroundColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.background.banner,
        card: embeddedColors.background.card,
        notification: embeddedColors.background.notification,
      }),
    borderColor:
      c?.borderColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.border.banner,
        card: embeddedColors.border.card,
        notification: embeddedColors.border.notification,
      }),
    borderWidth: c?.borderWidth ?? defaultBorderWidth,
    borderCornerRadius: c?.borderCornerRadius ?? defaultBorderCornerRadius,
    primaryBtnBackgroundColor:
      c?.primaryBtnBackgroundColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.primaryBtnBackground.banner,
        card: embeddedColors.primaryBtnBackground.card,
        notification: embeddedColors.primaryBtnBackground.notification,
      }),
    primaryBtnTextColor:
      c?.primaryBtnTextColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.primaryBtnText.banner,
        card: embeddedColors.primaryBtnText.card,
        notification: embeddedColors.primaryBtnText.notification,
      }),
    secondaryBtnBackgroundColor:
      c?.secondaryBtnBackgroundColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.secondaryBtnBackground.banner,
        card: embeddedColors.secondaryBtnBackground.card,
        notification: embeddedColors.secondaryBtnBackground.notification,
      }),
    secondaryBtnTextColor:
      c?.secondaryBtnTextColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.secondaryBtnText.banner,
        card: embeddedColors.secondaryBtnText.card,
        notification: embeddedColors.secondaryBtnText.notification,
      }),
    titleTextColor:
      c?.titleTextColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.titleText.banner,
        card: embeddedColors.titleText.card,
        notification: embeddedColors.titleText.notification,
      }),
    bodyTextColor:
      c?.bodyTextColor ??
      getDefaultColor(viewType, {
        banner: embeddedColors.bodyText.banner,
        card: embeddedColors.bodyText.card,
        notification: embeddedColors.bodyText.notification,
      }),
  };
};
