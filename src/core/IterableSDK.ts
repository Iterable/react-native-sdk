import { NativeModules, Platform } from 'react-native';
import type {
  IterableConfig,
  IterableInAppMessage,
  IterableInboxMessage,
  IterableUserUpdate,
  IterableEventData,
  IterableAttributionInfo,
  IterableCommerceItem,
} from './types';

const { RNIterableAPI } = NativeModules;

class IterableSDK {
  private static instance: IterableSDK;
  private initialized = false;

  private constructor() {}

  static getInstance(): IterableSDK {
    if (!IterableSDK.instance) {
      IterableSDK.instance = new IterableSDK();
    }
    return IterableSDK.instance;
  }

  /**
   * Initialize the Iterable SDK
   * @param apiKey - Your Iterable API key
   * @param config - Optional configuration object
   */
  initialize(apiKey: string, config?: IterableConfig): Promise<void> {
    if (this.initialized) {
      console.warn('Iterable SDK is already initialized');
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.initializeWithApiKey(
          apiKey,
          config || {},
          Platform.OS === 'ios' ? 'Fabric' : 'TurboModule',
          (error: any) => {
            if (error) {
              reject(error);
            } else {
              this.initialized = true;
              resolve();
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Set the user's email
   * @param email - User's email address
   * @param authToken - Optional authentication token
   */
  setEmail(email: string, authToken?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.setEmail(email, authToken, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the current user's email
   */
  getEmail(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.getEmail((error: any, email: string) => {
          if (error) {
            reject(error);
          } else {
            resolve(email);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Set the user's ID
   * @param userId - User's ID
   * @param authToken - Optional authentication token
   */
  setUserId(userId: string, authToken?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.setUserId(userId, authToken, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the current user's ID
   */
  getUserId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.getUserId((error: any, userId: string) => {
          if (error) {
            reject(error);
          } else {
            resolve(userId);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Track a custom event
   * @param name - Event name
   * @param dataFields - Optional event data
   */
  trackEvent(name: string, dataFields?: IterableEventData): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.trackEvent(name, dataFields || {}, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update user data
   * @param dataFields - User data to update
   * @param mergeNestedObjects - Whether to merge nested objects
   */
  updateUser(
    dataFields: IterableUserUpdate,
    mergeNestedObjects = false
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.updateUser(
          dataFields,
          mergeNestedObjects,
          (error: any) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get in-app messages
   */
  getInAppMessages(): Promise<IterableInAppMessage[]> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.getInAppMessages(
          (error: any, messages: IterableInAppMessage[]) => {
            if (error) {
              reject(error);
            } else {
              resolve(messages);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get inbox messages
   */
  getInboxMessages(): Promise<IterableInboxMessage[]> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.getInboxMessages(
          (error: any, messages: IterableInboxMessage[]) => {
            if (error) {
              reject(error);
            } else {
              resolve(messages);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Show an in-app message
   * @param messageId - Message ID to show
   * @param consume - Whether to consume the message
   */
  showMessage(messageId: string, consume: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.showMessage(messageId, consume, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Set a message as read/unread
   * @param messageId - Message ID
   * @param read - Whether to mark as read
   */
  setReadForMessage(messageId: string, read: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.setReadForMessage(messageId, read, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Remove a message
   * @param messageId - Message ID to remove
   * @param location - Message location
   * @param deleteSource - Delete source
   */
  removeMessage(
    messageId: string,
    location: number,
    deleteSource: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.removeMessage(
          messageId,
          location,
          deleteSource,
          (error: any) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update the shopping cart
   * @param items - Cart items
   */
  updateCart(items: IterableCommerceItem[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.updateCart(items, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Track a purchase
   * @param total - Total purchase amount
   * @param items - Purchase items
   * @param dataFields - Optional purchase data
   */
  trackPurchase(
    total: number,
    items: IterableCommerceItem[],
    dataFields?: IterableEventData
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.trackPurchase(
          total,
          items,
          dataFields || {},
          (error: any) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get attribution info
   */
  getAttributionInfo(): Promise<IterableAttributionInfo | null> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.getAttributionInfo(
          (error: any, info: IterableAttributionInfo) => {
            if (error) {
              reject(error);
            } else {
              resolve(info);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Set attribution info
   * @param attributionInfo - Attribution info to set
   */
  setAttributionInfo(attributionInfo: IterableAttributionInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        RNIterableAPI.setAttributionInfo(attributionInfo, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const Iterable = IterableSDK.getInstance();
