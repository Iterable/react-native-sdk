import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';
import { IterableEmbeddedMessage } from './IterableEmbeddedMessage';
import { IterableEmbeddedViewConfig } from './IterableEmbeddedViewConfig';
import type { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedViewButtonInfo } from '../types/IterableEmbeddedViewButtonInfo';
import type { IterableEmbeddedViewStyles } from '../types/IterableEmbeddedViewStyles';
import {
  embeddedBackgroundColors,
  embeddedBodyTextColors,
  embeddedBorderColors,
  embeddedPrimaryBtnBackgroundColors,
  embeddedPrimaryBtnTextColors,
  embeddedSecondaryBtnBackgroundColors,
  embeddedSecondaryBtnTextColors,
  embeddedTitleTextColors,
} from '../constants/embeddedViewDefaults';

export class IterableEmbeddedView {
  private viewType: IterableEmbeddedViewType;
  private message: IterableEmbeddedMessage;
  private config?: IterableEmbeddedViewConfig | null;

  private readonly defaultBackgroundColor: number;
  private readonly defaultBorderColor: number;
  private readonly defaultPrimaryBtnBackgroundColor: number;
  private readonly defaultPrimaryBtnTextColor: number;
  private readonly defaultSecondaryBtnBackgroundColor: number;
  private readonly defaultSecondaryBtnTextColor: number;
  private readonly defaultTitleTextColor: number;
  private readonly defaultBodyTextColor: number;
  private readonly defaultBorderWidth: number = 1;
  private readonly defaultBorderCornerRadius: number = 8.0;

  constructor(
    viewType: IterableEmbeddedViewType,
    message: IterableEmbeddedMessage,
    config?: IterableEmbeddedViewConfig | null
  ) {
    this.viewType = viewType;
    this.message = message;
    this.config = config ?? null;

    // Default color values are placeholders; caller can map them to theme values if needed.
    // These numeric values mirror the Kotlin use of Int colors.
    this.defaultBackgroundColor = this.getDefaultColor(
      viewType,
      embeddedBackgroundColors.notification,
      embeddedBackgroundColors.card,
      embeddedBackgroundColors.banner
    );
    this.defaultBorderColor = this.getDefaultColor(
      viewType,
      embeddedBorderColors.notification,
      embeddedBorderColors.card,
      embeddedBorderColors.banner
    );
    this.defaultPrimaryBtnBackgroundColor = this.getDefaultColor(
      viewType,
      embeddedPrimaryBtnBackgroundColors.notification,
      embeddedPrimaryBtnBackgroundColors.card,
      embeddedPrimaryBtnBackgroundColors.banner
    );
    this.defaultPrimaryBtnTextColor = this.getDefaultColor(
      viewType,
      embeddedPrimaryBtnTextColors.notification,
      embeddedPrimaryBtnTextColors.card,
      embeddedPrimaryBtnTextColors.banner
    );
    this.defaultSecondaryBtnBackgroundColor = this.getDefaultColor(
      viewType,
      embeddedSecondaryBtnBackgroundColors.notification,
      embeddedSecondaryBtnBackgroundColors.card,
      embeddedSecondaryBtnBackgroundColors.banner
    );
    this.defaultSecondaryBtnTextColor = this.getDefaultColor(
      viewType,
      embeddedSecondaryBtnTextColors.notification,
      embeddedSecondaryBtnTextColors.card,
      embeddedSecondaryBtnTextColors.banner
    );
    this.defaultTitleTextColor = this.getDefaultColor(
      viewType,
      embeddedTitleTextColors.notification,
      embeddedTitleTextColors.card,
      embeddedTitleTextColors.banner
    );
    this.defaultBodyTextColor = this.getDefaultColor(
      viewType,
      embeddedBodyTextColors.notification,
      embeddedBodyTextColors.card,
      embeddedBodyTextColors.banner
    );
  }

  getStyles(): IterableEmbeddedViewStyles {
    const c = this.config;
    return {
      backgroundColor: c?.backgroundColor ?? this.defaultBackgroundColor,
      borderColor: c?.borderColor ?? this.defaultBorderColor,
      borderWidth: c?.borderWidth ?? this.defaultBorderWidth,
      borderCornerRadius:
        c?.borderCornerRadius ?? this.defaultBorderCornerRadius,
      primaryBtnBackgroundColor:
        c?.primaryBtnBackgroundColor ?? this.defaultPrimaryBtnBackgroundColor,
      primaryBtnTextColor:
        c?.primaryBtnTextColor ?? this.defaultPrimaryBtnTextColor,
      secondaryBtnBackgroundColor:
        c?.secondaryBtnBackgroundColor ??
        this.defaultSecondaryBtnBackgroundColor,
      secondaryBtnTextColor:
        c?.secondaryBtnTextColor ?? this.defaultSecondaryBtnTextColor,
      titleTextColor: c?.titleTextColor ?? this.defaultTitleTextColor,
      bodyTextColor: c?.bodyTextColor ?? this.defaultBodyTextColor,
    };
  }

  getTitle(): string | null | undefined {
    return this.message.elements?.title ?? null;
  }

  getBody(): string | null | undefined {
    return this.message.elements?.body ?? null;
  }

  getMedia(): {
    url?: string | null;
    caption?: string | null;
    shouldShow: boolean;
  } {
    const url = this.message.elements?.mediaURL ?? null;
    const caption = this.message.elements?.mediaUrlCaption ?? null;
    const shouldShow =
      !!url &&
      url.length > 0 &&
      this.viewType !== IterableEmbeddedViewType.Notification;
    return { url, caption, shouldShow };
  }

  getButtons(): IterableEmbeddedViewButtonInfo[] {
    const buttons = this.message.elements?.buttons ?? null;
    if (!buttons || buttons.length === 0) return [];

    const mapOne = (
      b?: IterableEmbeddedMessageElementsButton | null
    ): IterableEmbeddedViewButtonInfo => {
      if (!b) return { id: null, title: null, clickedUrl: null };
      const clickedUrl =
        (b.action?.data && b.action?.data?.length > 0
          ? b.action.data
          : b.action?.type) ?? null;
      return { id: b.id ?? null, title: b.title ?? null, clickedUrl };
    };

    const first = mapOne(buttons[0] ?? null);
    const second = mapOne(buttons.length > 1 ? buttons[1] : null);

    return [first, second].filter((bi) => bi.title && bi.title.length > 0);
  }

  getDefaultActionUrl(): string | null {
    const da = this.message.elements?.defaultAction ?? null;
    if (!da) return null;
    return (da.data && da.data.length > 0 ? da.data : da.type) ?? null;
  }

  private getDefaultColor(
    viewType: IterableEmbeddedViewType,
    notificationColor: number,
    cardColor: number,
    bannerColor: number
  ): number {
    switch (viewType) {
      case IterableEmbeddedViewType.Notification:
        return notificationColor;
      case IterableEmbeddedViewType.Card:
        return cardColor;
      default:
        return bannerColor;
    }
  }
}
