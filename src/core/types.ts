export interface IterableConfig {
  pushIntegrationName?: string;
  urlHandler?: (url: string) => boolean;
  customActionHandler?: (action: string) => boolean;
  autoPushRegistration?: boolean;
  inAppDisplayInterval?: number;
  inAppHandler?: (message: IterableInAppMessage) => boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export interface IterableInAppMessage {
  messageId: string;
  campaignId: number;
  trigger: {
    type: string;
    [key: string]: any;
  };
  content: {
    title?: string;
    body?: string;
    imageUrl?: string;
    buttons?: Array<{
      id: string;
      type: string;
      title: string;
      action?: {
        type: string;
        data?: any;
      };
    }>;
  };
  priorityLevel?: number;
  saveToInbox?: boolean;
  inboxMetadata?: {
    title?: string;
    subtitle?: string;
    icon?: string;
  };
  read?: boolean;
  consumed?: boolean;
  expiresAt?: number;
}

export interface IterableInboxMessage extends IterableInAppMessage {
  inboxMetadata: {
    title: string;
    subtitle?: string;
    icon?: string;
  };
}

export interface IterableUserUpdate {
  email?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

export interface IterableEventData {
  [key: string]: any;
}

export interface IterableAttributionInfo {
  campaignId: number;
  templateId: number;
  messageId: string;
}

export interface IterableCommerceItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  categories?: string[];
  dataFields?: {
    [key: string]: any;
  };
}
