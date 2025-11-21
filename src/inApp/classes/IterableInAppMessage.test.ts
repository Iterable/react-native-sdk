import type { ViewToken } from 'react-native';
import { IterableInAppMessage } from './IterableInAppMessage';
import { IterableInAppTrigger } from './IterableInAppTrigger';
import { IterableInboxMetadata } from './IterableInboxMetadata';
import { IterableInAppTriggerType } from '../enums';
import type { IterableInAppMessageRaw } from '../types';

describe('IterableInAppMessage', () => {
  let mockTrigger: IterableInAppTrigger;
  let mockInboxMetadata: IterableInboxMetadata;
  let mockDate: Date;

  beforeEach(() => {
    mockTrigger = new IterableInAppTrigger(IterableInAppTriggerType.immediate);
    mockInboxMetadata = new IterableInboxMetadata('Test Title', 'Test Subtitle', 'test-icon.png');
    mockDate = new Date('2023-01-01T00:00:00Z');
  });

  describe('constructor', () => {
    it('should create an instance with all parameters', () => {
      const message = new IterableInAppMessage(
        'test-message-id',
        123,
        mockTrigger,
        mockDate,
        mockDate,
        true,
        mockInboxMetadata,
        { custom: 'payload' },
        false,
        5
      );

      expect(message.messageId).toBe('test-message-id');
      expect(message.campaignId).toBe(123);
      expect(message.trigger).toBe(mockTrigger);
      expect(message.createdAt).toBe(mockDate);
      expect(message.expiresAt).toBe(mockDate);
      expect(message.saveToInbox).toBe(true);
      expect(message.inboxMetadata).toBe(mockInboxMetadata);
      expect(message.customPayload).toEqual({ custom: 'payload' });
      expect(message.read).toBe(false);
      expect(message.priorityLevel).toBe(5);
    });

    it('should create an instance with undefined optional parameters', () => {
      const message = new IterableInAppMessage(
        'test-message-id',
        123,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        true,
        0
      );

      expect(message.messageId).toBe('test-message-id');
      expect(message.campaignId).toBe(123);
      expect(message.trigger).toBe(mockTrigger);
      expect(message.createdAt).toBeUndefined();
      expect(message.expiresAt).toBeUndefined();
      expect(message.saveToInbox).toBe(false);
      expect(message.inboxMetadata).toBeUndefined();
      expect(message.customPayload).toBeUndefined();
      expect(message.read).toBe(true);
      expect(message.priorityLevel).toBe(0);
    });

    it('should handle empty string messageId', () => {
      const message = new IterableInAppMessage(
        '',
        0,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        false,
        0
      );

      expect(message.messageId).toBe('');
      expect(message.campaignId).toBe(0);
    });

    it('should handle negative campaignId', () => {
      const message = new IterableInAppMessage(
        'test-id',
        -1,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        false,
        0
      );

      expect(message.campaignId).toBe(-1);
    });

    it('should handle negative priorityLevel', () => {
      const message = new IterableInAppMessage(
        'test-id',
        1,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        false,
        -5
      );

      expect(message.priorityLevel).toBe(-5);
    });
  });

  describe('fromDict', () => {
    it('should create instance from complete dictionary', () => {
      const dict: IterableInAppMessageRaw = {
        messageId: 'dict-message-id',
        campaignId: 456,
        trigger: { type: IterableInAppTriggerType.event },
        createdAt: 1672531200000, // 2023-01-01T00:00:00Z in milliseconds
        expiresAt: 1672617600000, // 2023-01-02T00:00:00Z in milliseconds
        saveToInbox: true,
        inboxMetadata: {
          title: 'Dict Title',
          subtitle: 'Dict Subtitle',
          icon: 'dict-icon.png'
        },
        customPayload: { dict: 'payload' },
        read: true,
        priorityLevel: 10
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(message.messageId).toBe('dict-message-id');
      expect(message.campaignId).toBe(456);
      expect(message.trigger.type).toBe(IterableInAppTriggerType.event);
      expect(typeof message.createdAt).toBe('number');
      expect(typeof message.expiresAt).toBe('number');
      expect(message.saveToInbox).toBe(true);
      expect(message.inboxMetadata).toBeInstanceOf(IterableInboxMetadata);
      expect(message.inboxMetadata?.title).toBe('Dict Title');
      expect(message.inboxMetadata?.subtitle).toBe('Dict Subtitle');
      expect(message.inboxMetadata?.icon).toBe('dict-icon.png');
      expect(message.customPayload).toEqual({ dict: 'payload' });
      expect(message.read).toBe(true);
      expect(message.priorityLevel).toBe(10);
    });

    it('should create instance from minimal dictionary', () => {
      const dict: IterableInAppMessageRaw = {
        messageId: 'minimal-id',
        campaignId: 1,
        trigger: { type: IterableInAppTriggerType.never }
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(message.messageId).toBe('minimal-id');
      expect(message.campaignId).toBe(1);
      expect(message.trigger.type).toBe(IterableInAppTriggerType.never);
      expect(message.createdAt).toBeUndefined();
      expect(message.expiresAt).toBeUndefined();
      expect(message.saveToInbox).toBe(false); // Default from IterableUtil.readBoolean
      expect(message.inboxMetadata).toBeUndefined();
      expect(message.customPayload).toBeUndefined();
      expect(message.read).toBe(false); // Default from IterableUtil.readBoolean
      expect(message.priorityLevel).toBeUndefined();
    });

    it('should handle undefined dates in dictionary', () => {
      const dict: IterableInAppMessageRaw = {
        messageId: 'no-dates-id',
        campaignId: 1,
        trigger: { type: IterableInAppTriggerType.immediate },
        createdAt: undefined,
        expiresAt: undefined
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(message.createdAt).toBeUndefined();
      expect(message.expiresAt).toBeUndefined();
    });

    it('should handle zero timestamps in dictionary', () => {
      const dict: IterableInAppMessageRaw = {
        messageId: 'zero-dates-id',
        campaignId: 1,
        trigger: { type: IterableInAppTriggerType.immediate },
        createdAt: 0,
        expiresAt: 0
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(typeof message.createdAt).toBe('number');
      expect(typeof message.expiresAt).toBe('number');
    });

    it('should handle truthy saveToInbox values', () => {
      const dict: IterableInAppMessageRaw = {
        messageId: 'truthy-save-id',
        campaignId: 1,
        trigger: { type: IterableInAppTriggerType.immediate },
        saveToInbox: 'true' as unknown as boolean // Testing IterableUtil.readBoolean behavior
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(message.saveToInbox).toBe('true' as unknown as boolean);
    });

    it('should handle truthy read values', () => {
      const dict: IterableInAppMessageRaw = {
        messageId: 'truthy-read-id',
        campaignId: 1,
        trigger: { type: IterableInAppTriggerType.immediate },
        read: 1 as unknown as boolean // Testing IterableUtil.readBoolean behavior
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(message.read).toBe(1 as unknown as boolean);
    });
  });

  describe('fromViewToken', () => {
    it('should create instance from ViewToken', () => {
      const originalMessage = new IterableInAppMessage(
        'view-token-id',
        789,
        mockTrigger,
        mockDate,
        mockDate,
        true,
        mockInboxMetadata,
        { view: 'token' },
        false,
        3
      );

      const viewToken: ViewToken = {
        item: {
          inAppMessage: originalMessage
        },
        index: 0,
        isViewable: true,
        key: 'test-key'
      };

      const message = IterableInAppMessage.fromViewToken(viewToken);

      expect(message.messageId).toBe('view-token-id');
      expect(message.campaignId).toBe(789);
      expect(message.trigger).toBe(mockTrigger);
      expect(message.createdAt).toBe(mockDate);
      expect(message.expiresAt).toBe(mockDate);
      expect(message.saveToInbox).toBe(true);
      expect(message.inboxMetadata).toBe(mockInboxMetadata);
      expect(message.customPayload).toEqual({ view: 'token' });
      expect(message.read).toBe(false);
      expect(message.priorityLevel).toBe(3);
    });

    it('should handle ViewToken with minimal message', () => {
      const minimalMessage = new IterableInAppMessage(
        'minimal-view-id',
        1,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        true,
        0
      );

      const viewToken: ViewToken = {
        item: {
          inAppMessage: minimalMessage
        },
        index: 0,
        isViewable: true,
        key: 'test-key'
      };

      const message = IterableInAppMessage.fromViewToken(viewToken);

      expect(message.messageId).toBe('minimal-view-id');
      expect(message.campaignId).toBe(1);
      expect(message.createdAt).toBeUndefined();
      expect(message.expiresAt).toBeUndefined();
      expect(message.saveToInbox).toBe(false);
      expect(message.inboxMetadata).toBeUndefined();
      expect(message.customPayload).toBeUndefined();
      expect(message.read).toBe(true);
      expect(message.priorityLevel).toBe(0);
    });
  });

  describe('isSilentInbox', () => {
    it('should return true for silent inbox message', () => {
      const silentTrigger = new IterableInAppTrigger(IterableInAppTriggerType.never);
      const message = new IterableInAppMessage(
        'silent-id',
        1,
        silentTrigger,
        undefined,
        undefined,
        true, // saveToInbox = true
        undefined,
        undefined,
        false,
        0
      );

      expect(message.isSilentInbox()).toBe(true);
    });

    it('should return false for non-silent inbox message', () => {
      const immediateTrigger = new IterableInAppTrigger(IterableInAppTriggerType.immediate);
      const message = new IterableInAppMessage(
        'non-silent-id',
        1,
        immediateTrigger,
        undefined,
        undefined,
        true, // saveToInbox = true
        undefined,
        undefined,
        false,
        0
      );

      expect(message.isSilentInbox()).toBe(false);
    });

    it('should return false for non-inbox message with never trigger', () => {
      const neverTrigger = new IterableInAppTrigger(IterableInAppTriggerType.never);
      const message = new IterableInAppMessage(
        'non-inbox-id',
        1,
        neverTrigger,
        undefined,
        undefined,
        false, // saveToInbox = false
        undefined,
        undefined,
        false,
        0
      );

      expect(message.isSilentInbox()).toBe(false);
    });

    it('should return false for event trigger with inbox', () => {
      const eventTrigger = new IterableInAppTrigger(IterableInAppTriggerType.event);
      const message = new IterableInAppMessage(
        'event-inbox-id',
        1,
        eventTrigger,
        undefined,
        undefined,
        true, // saveToInbox = true
        undefined,
        undefined,
        false,
        0
      );

      expect(message.isSilentInbox()).toBe(false);
    });
  });

  describe('property access', () => {
    it('should have readonly properties', () => {
      const message = new IterableInAppMessage(
        'readonly-test',
        1,
        mockTrigger,
        mockDate,
        mockDate,
        true,
        mockInboxMetadata,
        { test: 'data' },
        false,
        5
      );

      // Test that properties are accessible and have expected values
      expect(message.messageId).toBe('readonly-test');
      expect(message.campaignId).toBe(1);
      expect(message.trigger).toBe(mockTrigger);
      expect(message.createdAt).toBe(mockDate);
      expect(message.expiresAt).toBe(mockDate);
      expect(message.saveToInbox).toBe(true);
      expect(message.inboxMetadata).toBe(mockInboxMetadata);
      expect(message.customPayload).toEqual({ test: 'data' });
      expect(message.read).toBe(false);
      expect(message.priorityLevel).toBe(5);
    });

    it('should preserve all property values', () => {
      const customPayload = { complex: { nested: { data: 'value' } } };
      const message = new IterableInAppMessage(
        'preserve-test',
        999,
        mockTrigger,
        mockDate,
        mockDate,
        true,
        mockInboxMetadata,
        customPayload,
        true,
        100
      );

      expect(message.messageId).toBe('preserve-test');
      expect(message.campaignId).toBe(999);
      expect(message.trigger).toBe(mockTrigger);
      expect(message.createdAt).toBe(mockDate);
      expect(message.expiresAt).toBe(mockDate);
      expect(message.saveToInbox).toBe(true);
      expect(message.inboxMetadata).toBe(mockInboxMetadata);
      expect(message.customPayload).toEqual(customPayload);
      expect(message.read).toBe(true);
      expect(message.priorityLevel).toBe(100);
    });
  });

  describe('edge cases', () => {
    it('should handle very long messageId', () => {
      const longId = 'a'.repeat(1000);
      const message = new IterableInAppMessage(
        longId,
        1,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        false,
        0
      );

      expect(message.messageId).toBe(longId);
      expect(message.messageId.length).toBe(1000);
    });

    it('should handle very large campaignId', () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      const message = new IterableInAppMessage(
        'test',
        largeId,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        false,
        0
      );

      expect(message.campaignId).toBe(largeId);
    });

    it('should handle very large priorityLevel', () => {
      const largePriority = Number.MAX_SAFE_INTEGER;
      const message = new IterableInAppMessage(
        'test',
        1,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        false,
        largePriority
      );

      expect(message.priorityLevel).toBe(largePriority);
    });

    it('should handle complex customPayload', () => {
      const complexPayload = {
        array: [1, 2, 3],
        object: { nested: { deep: { value: 'test' } } },
        nullValue: null,
        undefinedValue: undefined,
        booleanValue: true,
        numberValue: 42,
        stringValue: 'hello'
      };

      const message = new IterableInAppMessage(
        'complex-payload',
        1,
        mockTrigger,
        undefined,
        undefined,
        false,
        undefined,
        complexPayload,
        false,
        0
      );

      expect(message.customPayload).toEqual(complexPayload);
    });

    it('should handle empty string values in metadata', () => {
      const emptyMetadata = new IterableInboxMetadata('', '', '');
      const message = new IterableInAppMessage(
        'empty-metadata',
        1,
        mockTrigger,
        undefined,
        undefined,
        false,
        emptyMetadata,
        undefined,
        false,
        0
      );

      expect(message.inboxMetadata?.title).toBe('');
      expect(message.inboxMetadata?.subtitle).toBe('');
      expect(message.inboxMetadata?.icon).toBe('');
    });
  });

  describe('date handling', () => {
    it('should handle valid date objects', () => {
      const pastDate = new Date('2020-01-01T00:00:00Z');
      const futureDate = new Date('2030-01-01T00:00:00Z');

      const message = new IterableInAppMessage(
        'date-test',
        1,
        mockTrigger,
        pastDate,
        futureDate,
        false,
        undefined,
        undefined,
        false,
        0
      );

      expect(message.createdAt).toBe(pastDate);
      expect(message.expiresAt).toBe(futureDate);
    });

    it('should handle date conversion from milliseconds in fromDict', () => {
      const dict: IterableInAppMessageRaw = {
        messageId: 'date-conversion-test',
        campaignId: 1,
        trigger: { type: IterableInAppTriggerType.immediate },
        createdAt: 1672531200000, // 2023-01-01T00:00:00Z
        expiresAt: 1672617600000  // 2023-01-02T00:00:00Z
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(typeof message.createdAt).toBe('number');
      expect(typeof message.expiresAt).toBe('number');
      expect(message.createdAt).toBe(1672531200000);
      expect(message.expiresAt).toBe(1672617600000);
    });
  });
});
