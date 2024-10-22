import { IterableInAppMessage } from '.';

// TODO: Add description
export type InboxRowViewModel = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  createdAt?: Date;
  read: boolean;
  inAppMessage: IterableInAppMessage;
};
