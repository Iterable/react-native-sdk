import { IterableInAppMessage } from '../../inApp';

// TODO: Add description
export type IterableInboxRowViewModel = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  createdAt?: Date;
  read: boolean;
  inAppMessage: IterableInAppMessage;
};
