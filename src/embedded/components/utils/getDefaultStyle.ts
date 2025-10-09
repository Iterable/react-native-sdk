import { IterableEmbeddedViewType } from '../../enums/IterableEmbeddedViewType';

export const getDefaultStyle = (
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
