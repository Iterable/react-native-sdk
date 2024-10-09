import { IterableInAppMessage } from '.';

// TODO: Add description
export interface InboxRowViewModel {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  createdAt?: Date;
  read: boolean;
  inAppMessage: IterableInAppMessage;
}
