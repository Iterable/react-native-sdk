import { IterableInAppMessage } from '.';

export type InboxRowViewModel = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  createdAt?: Date;
  read: boolean;
  inAppMessage: IterableInAppMessage;
};
