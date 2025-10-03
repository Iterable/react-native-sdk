import { NativeModules } from 'react-native';
import { IterableInboxDataModel } from './IterableInboxDataModel';
import { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import { IterableInAppTrigger } from '../../inApp/classes/IterableInAppTrigger';
import { IterableInboxMetadata } from '../../inApp/classes/IterableInboxMetadata';
import { IterableInAppTriggerType } from '../../inApp/enums';
import { IterableInAppDeleteSource } from '../../inApp/enums/IterableInAppDeleteSource';
import { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
// import type { IterableInboxImpressionRowInfo } from '../types';

// Mock the native modules
jest.mock('react-native', () => ({
  NativeModules: {
    RNIterableAPI: {
      getInboxMessages: jest.fn(),
      getHtmlInAppContentForMessage: jest.fn(),
      setReadForMessage: jest.fn(),
      removeMessage: jest.fn(),
      startSession: jest.fn(),
      endSession: jest.fn(),
      updateVisibleRows: jest.fn(),
    },
  },
}));

// Mock the Iterable class
jest.mock('../../core/classes/Iterable', () => ({
  Iterable: {
    logger: {
      log: jest.fn(),
    },
  },
}));

describe('IterableInboxDataModel', () => {
  let dataModel: IterableInboxDataModel;
  let mockRNIterableAPI: unknown;
  let mockMessage1: IterableInAppMessage;
  let mockMessage2: IterableInAppMessage;
  let mockMessage3: IterableInAppMessage;

  beforeEach(() => {
    dataModel = new IterableInboxDataModel();
    mockRNIterableAPI = NativeModules.RNIterableAPI;

    // Reset all mocks
    jest.clearAllMocks();

    // Create mock messages
    const trigger1 = new IterableInAppTrigger(IterableInAppTriggerType.immediate);
    const trigger2 = new IterableInAppTrigger(IterableInAppTriggerType.event);
    const trigger3 = new IterableInAppTrigger(IterableInAppTriggerType.never);

    const metadata1 = new IterableInboxMetadata('Title 1', 'Subtitle 1', 'icon1.png');
    const metadata2 = new IterableInboxMetadata('Title 2', 'Subtitle 2', 'icon2.png');
    const metadata3 = new IterableInboxMetadata('Title 3', 'Subtitle 3', 'icon3.png');

    const date1 = new Date('2023-01-01T00:00:00Z');
    const date2 = new Date('2023-01-02T00:00:00Z');
    const date3 = new Date('2023-01-03T00:00:00Z');

    mockMessage1 = new IterableInAppMessage(
      'msg1',
      1,
      trigger1,
      date1,
      undefined,
      true,
      metadata1,
      { custom: 'payload1' },
      false,
      5
    );

    mockMessage2 = new IterableInAppMessage(
      'msg2',
      2,
      trigger2,
      date2,
      undefined,
      true,
      metadata2,
      { custom: 'payload2' },
      true,
      3
    );

    mockMessage3 = new IterableInAppMessage(
      'msg3',
      3,
      trigger3,
      date3,
      undefined,
      false,
      metadata3,
      { custom: 'payload3' },
      false,
      1
    );

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance with undefined function properties', () => {
      expect(dataModel.filterFn).toBeUndefined();
      expect(dataModel.comparatorFn).toBeUndefined();
      expect(dataModel.dateMapperFn).toBeUndefined();
    });

    it('should be an instance of IterableInboxDataModel', () => {
      expect(dataModel).toBeInstanceOf(IterableInboxDataModel);
    });
  });

  describe('set method', () => {
    it('should set filter function', () => {
      const filterFn = (message: IterableInAppMessage) => message.campaignId > 1;
      dataModel.set(filterFn);

      expect(dataModel.filterFn).toBe(filterFn);
      expect(dataModel.comparatorFn).toBeUndefined();
      expect(dataModel.dateMapperFn).toBeUndefined();
    });

    it('should set comparator function', () => {
      const comparatorFn = (msg1: IterableInAppMessage, msg2: IterableInAppMessage) =>
        msg1.priorityLevel - msg2.priorityLevel;
      dataModel.set(undefined, comparatorFn);

      expect(dataModel.filterFn).toBeUndefined();
      expect(dataModel.comparatorFn).toBe(comparatorFn);
      expect(dataModel.dateMapperFn).toBeUndefined();
    });

    it('should set date mapper function', () => {
      const dateMapperFn = (message: IterableInAppMessage) =>
        message.createdAt?.toISOString() ?? 'No date';
      dataModel.set(undefined, undefined, dateMapperFn);

      expect(dataModel.filterFn).toBeUndefined();
      expect(dataModel.comparatorFn).toBeUndefined();
      expect(dataModel.dateMapperFn).toBe(dateMapperFn);
    });

    it('should set all functions', () => {
      const filterFn = (_message: IterableInAppMessage) => true;
      const comparatorFn = (_msg1: IterableInAppMessage, _msg2: IterableInAppMessage) => 0;
      const dateMapperFn = (_message: IterableInAppMessage) => 'Unknown';

      dataModel.set(filterFn, comparatorFn, dateMapperFn);

      expect(dataModel.filterFn).toBe(filterFn);
      expect(dataModel.comparatorFn).toBe(comparatorFn);
      expect(dataModel.dateMapperFn).toBe(dateMapperFn);
    });

    it('should clear functions when undefined', () => {
      // Set functions first
      dataModel.set(
        (_msg) => true,
        (_msg1, _msg2) => 0,
        (_msg) => 'date'
      );

      // Clear them
      dataModel.set();

      expect(dataModel.filterFn).toBeUndefined();
      expect(dataModel.comparatorFn).toBeUndefined();
      expect(dataModel.dateMapperFn).toBeUndefined();
    });
  });

  describe('getFormattedDate', () => {
    it('should return empty string for message with undefined createdAt', () => {
      const messageWithoutDate = new IterableInAppMessage(
        'no-date',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        false,
        0
      );

      const result = dataModel.getFormattedDate(messageWithoutDate);
      expect(result).toBe('');
    });

    it('should use custom date mapper when provided', () => {
      const customDateMapper = (_message: IterableInAppMessage) =>
        `Custom: ${mockMessage1.createdAt?.toISOString()}`;
      dataModel.set(undefined, undefined, customDateMapper);

      const result = dataModel.getFormattedDate(mockMessage1);
      expect(result).toBe(`Custom: ${mockMessage1.createdAt?.toISOString()}`);
    });

    it('should use default date mapper when no custom mapper provided', () => {
      const result = dataModel.getFormattedDate(mockMessage1);
      expect(result).toContain('at');
      expect(result?.length).toBeGreaterThan(0);
    });

    it('should handle string createdAt in default mapper', () => {
      const messageWithStringDate = new IterableInAppMessage(
        'string-date',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        '1672531200000' as unknown as Date, // String timestamp
        undefined,
        false,
        undefined,
        undefined,
        false,
        0
      );

      const result = dataModel.getFormattedDate(messageWithStringDate);
      expect(result?.length).toBeGreaterThan(0);
    });
  });

  describe('getHtmlContentForMessageId', () => {
    it('should be a function', () => {
      expect(typeof dataModel.getHtmlContentForMessageId).toBe('function');
    });

    it('should accept string parameter', () => {
      // Test that the method accepts a string parameter without throwing
      expect(() => {
        dataModel.getHtmlContentForMessageId('test-id');
      }).not.toThrow();
    });

    it('should handle empty string parameter', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId('');
      }).not.toThrow();
    });

    it('should handle very long message IDs', () => {
      const longMessageId = 'a'.repeat(1000);
      expect(() => {
        dataModel.getHtmlContentForMessageId(longMessageId);
      }).not.toThrow();
    });

    it('should handle special characters in message ID', () => {
      const specialMessageId = 'msg-123_456@test.com#special';
      expect(() => {
        dataModel.getHtmlContentForMessageId(specialMessageId);
      }).not.toThrow();
    });

    it('should handle null message ID', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId(null as unknown as string);
      }).not.toThrow();
    });

    it('should handle undefined message ID', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId(undefined as unknown as string);
      }).not.toThrow();
    });

    it('should handle numeric message ID', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId(123 as unknown as string);
      }).not.toThrow();
    });

    it('should handle object message ID', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId({ id: 'test' } as unknown as string);
      }).not.toThrow();
    });

    it('should handle array message ID', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId(['test', 'id'] as unknown as string);
      }).not.toThrow();
    });

    it('should handle boolean message ID', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId(true as unknown as string);
      }).not.toThrow();
    });

    it('should handle function message ID', () => {
      expect(() => {
        dataModel.getHtmlContentForMessageId((() => 'test') as unknown as string);
      }).not.toThrow();
    });

    it('should handle very long string message ID', () => {
      const veryLongMessageId = 'x'.repeat(10000);
      expect(() => {
        dataModel.getHtmlContentForMessageId(veryLongMessageId);
      }).not.toThrow();
    });

    it('should handle unicode message ID', () => {
      const unicodeMessageId = '测试消息ID_🚀_ñáéíóú';
      expect(() => {
        dataModel.getHtmlContentForMessageId(unicodeMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with newlines', () => {
      const newlineMessageId = 'test\nmessage\nid';
      expect(() => {
        dataModel.getHtmlContentForMessageId(newlineMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with tabs', () => {
      const tabMessageId = 'test\tmessage\tid';
      expect(() => {
        dataModel.getHtmlContentForMessageId(tabMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with quotes', () => {
      const quoteMessageId = 'test"message"id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(quoteMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with single quotes', () => {
      const singleQuoteMessageId = "test'message'id";
      expect(() => {
        dataModel.getHtmlContentForMessageId(singleQuoteMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with backticks', () => {
      const backtickMessageId = 'test`message`id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(backtickMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with brackets', () => {
      const bracketMessageId = 'test[message]id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(bracketMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with parentheses', () => {
      const parenMessageId = 'test(message)id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(parenMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with braces', () => {
      const braceMessageId = 'test{message}id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(braceMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with angle brackets', () => {
      const angleMessageId = 'test<message>id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(angleMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with pipes', () => {
      const pipeMessageId = 'test|message|id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(pipeMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with backslashes', () => {
      const backslashMessageId = 'test\\message\\id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(backslashMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with forward slashes', () => {
      const slashMessageId = 'test/message/id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(slashMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with spaces', () => {
      const spaceMessageId = 'test message id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(spaceMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with multiple spaces', () => {
      const multiSpaceMessageId = 'test   message   id';
      expect(() => {
        dataModel.getHtmlContentForMessageId(multiSpaceMessageId);
      }).not.toThrow();
    });

    it('should handle message ID with leading/trailing spaces', () => {
      const spaceMessageId = '  test message id  ';
      expect(() => {
        dataModel.getHtmlContentForMessageId(spaceMessageId);
      }).not.toThrow();
    });
  });

  describe('refresh', () => {
    it('should be a function', () => {
      expect(typeof dataModel.refresh).toBe('function');
    });

    it('should return a Promise', () => {
      const result = dataModel.refresh();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should handle successful API response with empty messages', async () => {
      // Mock the native API to return empty array
      const mockGetInboxMessages = jest.fn().mockResolvedValue([]);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle successful API response with single message', async () => {
      const mockMessage = new IterableInAppMessage(
        'single-msg',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date('2023-01-01T00:00:00Z'),
        undefined,
        true,
        new IterableInboxMetadata('Single Title', 'Single Subtitle', 'single-icon.png'),
        { single: 'payload' },
        false,
        5
      );

      const mockGetInboxMessages = jest.fn().mockResolvedValue([mockMessage]);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('title', 'Single Title');
      expect(result[0]).toHaveProperty('subtitle', 'Single Subtitle');
      expect(result[0]).toHaveProperty('imageUrl', 'single-icon.png');
      expect(result[0]).toHaveProperty('read', false);
      expect(result[0]).toHaveProperty('inAppMessage', mockMessage);
    });

    it('should handle successful API response with multiple messages', async () => {
      const mockMessages = [mockMessage1, mockMessage2, mockMessage3];
      const mockGetInboxMessages = jest.fn().mockResolvedValue(mockMessages);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      // Should be sorted by creation date (most recent first)
      expect(result[0]).toHaveProperty('title', 'Title 3'); // Most recent
      expect(result[1]).toHaveProperty('title', 'Title 2');
      expect(result[2]).toHaveProperty('title', 'Title 1'); // Oldest
    });

    it('should handle API failure gracefully', async () => {
      const mockGetInboxMessages = jest.fn().mockRejectedValue(new Error('API Error'));
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle network timeout error', async () => {
      const timeoutError = new Error('Network timeout');
      timeoutError.name = 'TimeoutError';
      const mockGetInboxMessages = jest.fn().mockRejectedValue(timeoutError);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle undefined API response', async () => {
      const mockGetInboxMessages = jest.fn().mockRejectedValue(new Error('Undefined response'));
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle null API response', async () => {
      const mockGetInboxMessages = jest.fn().mockRejectedValue(new Error('Null response'));
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should apply filter function when set', async () => {
      const filterFn = (message: IterableInAppMessage) => message.campaignId > 1;
      dataModel.set(filterFn);

      const mockMessages = [mockMessage1, mockMessage2, mockMessage3];
      const mockGetInboxMessages = jest.fn().mockResolvedValue(mockMessages);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(2); // Only messages with campaignId > 1
      // Should be sorted by creation date (most recent first)
      expect(result[0]?.inAppMessage.campaignId).toBe(3); // Most recent
      expect(result[1]?.inAppMessage.campaignId).toBe(2);
    });

    it('should apply comparator function when set', async () => {
      const comparatorFn = (msg1: IterableInAppMessage, msg2: IterableInAppMessage) =>
        msg1.priorityLevel - msg2.priorityLevel;
      dataModel.set(undefined, comparatorFn);

      const mockMessages = [mockMessage1, mockMessage2, mockMessage3];
      const mockGetInboxMessages = jest.fn().mockResolvedValue(mockMessages);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      // Should be sorted by priority level (1, 3, 5)
      expect(result[0]?.inAppMessage.priorityLevel).toBe(1);
      expect(result[1]?.inAppMessage.priorityLevel).toBe(3);
      expect(result[2]?.inAppMessage.priorityLevel).toBe(5);
    });

    it('should use default sorting when no comparator set', async () => {
      const mockMessages = [mockMessage1, mockMessage2, mockMessage3];
      const mockGetInboxMessages = jest.fn().mockResolvedValue(mockMessages);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      // Should be sorted by creation date (most recent first)
      expect(result[0]?.inAppMessage.messageId).toBe('msg3'); // Most recent
      expect(result[1]?.inAppMessage.messageId).toBe('msg2');
      expect(result[2]?.inAppMessage.messageId).toBe('msg1'); // Oldest
    });

    it('should apply both filter and comparator functions', async () => {
      const filterFn = (message: IterableInAppMessage) => message.saveToInbox === true;
      const comparatorFn = (msg1: IterableInAppMessage, msg2: IterableInAppMessage) =>
        msg2.priorityLevel - msg1.priorityLevel; // Higher priority first
      dataModel.set(filterFn, comparatorFn);

      const mockMessages = [mockMessage1, mockMessage2, mockMessage3];
      const mockGetInboxMessages = jest.fn().mockResolvedValue(mockMessages);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(2); // Only messages with saveToInbox = true
      // Should be sorted by priority level (higher first: 5, 3)
      expect(result[0]?.inAppMessage.priorityLevel).toBe(5);
      expect(result[1]?.inAppMessage.priorityLevel).toBe(3);
    });

    it('should handle messages without inbox metadata', async () => {
      const messageWithoutMetadata = new IterableInAppMessage(
        'no-metadata',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        undefined,
        true,
        undefined, // No metadata
        undefined,
        false,
        0
      );

      const mockGetInboxMessages = jest.fn().mockResolvedValue([messageWithoutMetadata]);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]?.title).toBe('');
      expect(result[0]?.subtitle).toBeUndefined();
      expect(result[0]?.imageUrl).toBeUndefined();
      expect(result[0]?.read).toBe(false);
      expect(result[0]?.inAppMessage).toBe(messageWithoutMetadata);
    });

    it('should handle messages with partial metadata', async () => {
      const partialMetadata = new IterableInboxMetadata('Title Only', undefined, undefined);
      const messageWithPartialMetadata = new IterableInAppMessage(
        'partial-metadata',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        undefined,
        true,
        partialMetadata,
        undefined,
        false,
        0
      );

      const mockGetInboxMessages = jest.fn().mockResolvedValue([messageWithPartialMetadata]);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]?.title).toBe('Title Only');
      expect(result[0]?.subtitle).toBeUndefined();
      expect(result[0]?.imageUrl).toBeUndefined();
      expect(result[0]?.read).toBe(false);
      expect(result[0]?.inAppMessage).toBe(messageWithPartialMetadata);
    });

    it('should handle filter function that returns false for all messages', async () => {
      const filterFn = (_message: IterableInAppMessage) => false;
      dataModel.set(filterFn);

      const mockMessages = [mockMessage1, mockMessage2, mockMessage3];
      const mockGetInboxMessages = jest.fn().mockResolvedValue(mockMessages);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle comparator function that returns 0 for all comparisons', async () => {
      const comparatorFn = (_msg1: IterableInAppMessage, _msg2: IterableInAppMessage) => 0;
      dataModel.set(undefined, comparatorFn);

      const mockMessages = [mockMessage1, mockMessage2];
      const mockGetInboxMessages = jest.fn().mockResolvedValue(mockMessages);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      // Order should remain unchanged when comparator returns 0
    });

    it('should handle very large number of messages', async () => {
      const largeMessageArray = Array.from({ length: 1000 }, (_, i) =>
        new IterableInAppMessage(
          `msg-${i}`,
          i,
          new IterableInAppTrigger(IterableInAppTriggerType.immediate),
          new Date(Date.now() - i * 1000), // Different creation times
          undefined,
          true,
          new IterableInboxMetadata(`Title ${i}`, `Subtitle ${i}`, `icon-${i}.png`),
          { index: i },
          false,
          i
        )
      );

      const mockGetInboxMessages = jest.fn().mockResolvedValue(largeMessageArray);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(1000);
      // Should be sorted by creation date (most recent first)
      expect(result[0]?.title).toBe('Title 0'); // Most recent
      expect(result[999]?.title).toBe('Title 999'); // Oldest
    });

    it('should handle concurrent refresh calls', async () => {
      const mockGetInboxMessages = jest.fn()
        .mockResolvedValueOnce([mockMessage1])
        .mockResolvedValueOnce([mockMessage2])
        .mockResolvedValueOnce([mockMessage3]);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const [result1, result2, result3] = await Promise.all([
        dataModel.refresh(),
        dataModel.refresh(),
        dataModel.refresh(),
      ]);

      expect(mockGetInboxMessages).toHaveBeenCalledTimes(3);
      expect(result1).toHaveLength(1);
      expect(result2).toHaveLength(1);
      expect(result3).toHaveLength(1);
      expect(result1[0]?.inAppMessage.messageId).toBe('msg1');
      expect(result2[0]?.inAppMessage.messageId).toBe('msg2');
      expect(result3[0]?.inAppMessage.messageId).toBe('msg3');
    });

    it('should handle messages with undefined createdAt', async () => {
      const messageWithoutDate = new IterableInAppMessage(
        'no-date',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        undefined,
        undefined,
        true,
        new IterableInboxMetadata('No Date Title', 'No Date Subtitle', 'no-date-icon.png'),
        undefined,
        false,
        0
      );

      const mockGetInboxMessages = jest.fn().mockResolvedValue([messageWithoutDate]);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]?.title).toBe('No Date Title');
      expect(result[0]?.createdAt).toBeUndefined();
    });

    it('should handle messages with string createdAt', async () => {
      const messageWithStringDate = new IterableInAppMessage(
        'string-date',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        '1672531200000' as unknown as Date,
        undefined,
        true,
        new IterableInboxMetadata('String Date Title', 'String Date Subtitle', 'string-date-icon.png'),
        undefined,
        false,
        0
      );

      const mockGetInboxMessages = jest.fn().mockResolvedValue([messageWithStringDate]);
      (NativeModules.RNIterableAPI as unknown as { getInboxMessages: jest.Mock }).getInboxMessages = mockGetInboxMessages;

      const result = await dataModel.refresh();

      expect(mockGetInboxMessages).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]?.title).toBe('String Date Title');
      expect(result[0]?.createdAt).toBe('1672531200000' as unknown as Date);
    });
  });

  describe('startSession', () => {
    it('should be a function', () => {
      expect(typeof dataModel.startSession).toBe('function');
    });

    it('should have correct method signature', () => {
      expect(dataModel.startSession.length).toBe(0); // No required parameters (has default)
    });

    it('should accept empty array parameter', () => {
      // Test that the method accepts an empty array without throwing
      expect(() => {
        dataModel.startSession([]);
      }).not.toThrow();
    });

    it('should accept single visible row', () => {
      const singleRow = [{ messageId: 'single-msg', silentInbox: false }];

      expect(() => {
        dataModel.startSession(singleRow);
      }).not.toThrow();
    });

    it('should accept multiple visible rows', () => {
      const multipleRows = [
        { messageId: 'msg1', silentInbox: false },
        { messageId: 'msg2', silentInbox: true },
        { messageId: 'msg3', silentInbox: false },
        { messageId: 'msg4', silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(multipleRows);
      }).not.toThrow();
    });

    it('should handle visible rows with all silentInbox true', () => {
      const silentRows = [
        { messageId: 'silent1', silentInbox: true },
        { messageId: 'silent2', silentInbox: true },
        { messageId: 'silent3', silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(silentRows);
      }).not.toThrow();
    });

    it('should handle visible rows with all silentInbox false', () => {
      const nonSilentRows = [
        { messageId: 'normal1', silentInbox: false },
        { messageId: 'normal2', silentInbox: false },
        { messageId: 'normal3', silentInbox: false }
      ];

      expect(() => {
        dataModel.startSession(nonSilentRows);
      }).not.toThrow();
    });

    it('should handle very large number of visible rows', () => {
      const largeRows = Array.from({ length: 1000 }, (_, i) => ({
        messageId: `msg-${i}`,
        silentInbox: i % 2 === 0
      }));

      expect(() => {
        dataModel.startSession(largeRows);
      }).not.toThrow();
    });

    it('should handle visible rows with special characters in message IDs', () => {
      const specialRows = [
        { messageId: 'msg-123_456@test.com#special', silentInbox: false },
        { messageId: 'msg with spaces', silentInbox: true },
        { messageId: 'msg\nwith\nnewlines', silentInbox: false },
        { messageId: 'msg\twith\ttabs', silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(specialRows);
      }).not.toThrow();
    });

    it('should handle visible rows with unicode message IDs', () => {
      const unicodeRows = [
        { messageId: '测试消息ID_🚀_ñáéíóú', silentInbox: false },
        { messageId: '消息-123', silentInbox: true },
        { messageId: 'сообщение-456', silentInbox: false }
      ];

      expect(() => {
        dataModel.startSession(unicodeRows);
      }).not.toThrow();
    });

    it('should handle visible rows with very long message IDs', () => {
      const longMessageId = 'a'.repeat(1000);
      const longRows = [
        { messageId: longMessageId, silentInbox: false },
        { messageId: 'normal-msg', silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(longRows);
      }).not.toThrow();
    });

    it('should handle visible rows with empty message IDs', () => {
      const emptyIdRows = [
        { messageId: '', silentInbox: false },
        { messageId: 'normal-msg', silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(emptyIdRows);
      }).not.toThrow();
    });

    it('should handle visible rows with null/undefined message IDs', () => {
      const nullIdRows = [
        { messageId: null as unknown as string, silentInbox: false },
        { messageId: undefined as unknown as string, silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(nullIdRows);
      }).not.toThrow();
    });

    it('should handle visible rows with numeric message IDs', () => {
      const numericIdRows = [
        { messageId: 123 as unknown as string, silentInbox: false },
        { messageId: 456 as unknown as string, silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(numericIdRows);
      }).not.toThrow();
    });

    it('should handle visible rows with object message IDs', () => {
      const objectIdRows = [
        { messageId: { id: 'test' } as unknown as string, silentInbox: false },
        { messageId: { messageId: 'msg' } as unknown as string, silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(objectIdRows);
      }).not.toThrow();
    });

    it('should handle visible rows with array message IDs', () => {
      const arrayIdRows = [
        { messageId: ['test', 'id'] as unknown as string, silentInbox: false },
        { messageId: ['msg', '123'] as unknown as string, silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(arrayIdRows);
      }).not.toThrow();
    });

    it('should handle visible rows with boolean message IDs', () => {
      const booleanIdRows = [
        { messageId: true as unknown as string, silentInbox: false },
        { messageId: false as unknown as string, silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(booleanIdRows);
      }).not.toThrow();
    });

    it('should handle visible rows with function message IDs', () => {
      const functionIdRows = [
        { messageId: (() => 'test') as unknown as string, silentInbox: false },
        { messageId: (() => 'msg') as unknown as string, silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(functionIdRows);
      }).not.toThrow();
    });

    it('should handle visible rows with mixed data types', () => {
      const mixedRows = [
        { messageId: 'string-msg', silentInbox: false },
        { messageId: 123 as unknown as string, silentInbox: true },
        { messageId: null as unknown as string, silentInbox: false },
        { messageId: undefined as unknown as string, silentInbox: true },
        { messageId: { id: 'test' } as unknown as string, silentInbox: false }
      ];

      expect(() => {
        dataModel.startSession(mixedRows);
      }).not.toThrow();
    });

    it('should handle concurrent startSession calls', () => {
      const rows1 = [{ messageId: 'msg1', silentInbox: false }];
      const rows2 = [{ messageId: 'msg2', silentInbox: true }];
      const rows3 = [{ messageId: 'msg3', silentInbox: false }];

      expect(() => {
        dataModel.startSession(rows1);
        dataModel.startSession(rows2);
        dataModel.startSession(rows3);
      }).not.toThrow();
    });

    it('should handle startSession with no parameters (default empty array)', () => {
      expect(() => {
        dataModel.startSession();
      }).not.toThrow();
    });

    it('should handle startSession with basic parameters', () => {
      const basicRows = [
        { messageId: 'test-msg-1', silentInbox: false },
        { messageId: 'test-msg-2', silentInbox: true }
      ];

      expect(() => {
        dataModel.startSession(basicRows);
      }).not.toThrow();
    });
  });

  describe('setMessageAsRead', () => {
    it('should call native API to mark message as read', () => {
      dataModel.setMessageAsRead('test-message-id');

      expect((mockRNIterableAPI as unknown as { setReadForMessage: jest.Mock }).setReadForMessage).toHaveBeenCalledWith('test-message-id', true);
    });

    it('should handle empty message ID', () => {
      dataModel.setMessageAsRead('');

      expect((mockRNIterableAPI as unknown as { setReadForMessage: jest.Mock }).setReadForMessage).toHaveBeenCalledWith('', true);
    });
  });

  describe('deleteItemById', () => {
    it('should call native API to delete message from inbox', () => {
      dataModel.deleteItemById('test-message-id', IterableInAppDeleteSource.deleteButton);

      expect((mockRNIterableAPI as unknown as { removeMessage: jest.Mock }).removeMessage).toHaveBeenCalledWith(
        'test-message-id',
        IterableInAppLocation.inbox,
        IterableInAppDeleteSource.deleteButton
      );
    });

    it('should handle different delete sources', () => {
      dataModel.deleteItemById('swipe-message', IterableInAppDeleteSource.inboxSwipe);

      expect((mockRNIterableAPI as unknown as { removeMessage: jest.Mock }).removeMessage).toHaveBeenCalledWith(
        'swipe-message',
        IterableInAppLocation.inbox,
        IterableInAppDeleteSource.inboxSwipe
      );
    });

    it('should handle unknown delete source', () => {
      dataModel.deleteItemById('unknown-message', IterableInAppDeleteSource.unknown);

      expect((mockRNIterableAPI as unknown as { removeMessage: jest.Mock }).removeMessage).toHaveBeenCalledWith(
        'unknown-message',
        IterableInAppLocation.inbox,
        IterableInAppDeleteSource.unknown
      );
    });
  });

  describe('session methods', () => {
    it('should have startSession method', () => {
      expect(typeof dataModel.startSession).toBe('function');
    });

    it('should have endSession method', () => {
      expect(typeof dataModel.endSession).toBe('function');
    });

    it('should have updateVisibleRows method', () => {
      expect(typeof dataModel.updateVisibleRows).toBe('function');
    });
  });

  describe('edge cases', () => {
    it('should handle messages without inbox metadata', () => {
      const messageWithoutMetadata = new IterableInAppMessage(
        'no-metadata',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        undefined,
        true,
        undefined, // No metadata
        undefined,
        false,
        0
      );

      // Test that the message can be processed without errors
      expect(messageWithoutMetadata.messageId).toBe('no-metadata');
      expect(messageWithoutMetadata.inboxMetadata).toBeUndefined();
    });

    it('should handle messages with partial metadata', () => {
      const partialMetadata = new IterableInboxMetadata('Title Only', undefined, undefined);
      const messageWithPartialMetadata = new IterableInAppMessage(
        'partial-metadata',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        undefined,
        true,
        partialMetadata,
        undefined,
        false,
        0
      );

      expect(messageWithPartialMetadata.inboxMetadata?.title).toBe('Title Only');
      expect(messageWithPartialMetadata.inboxMetadata?.subtitle).toBeUndefined();
      expect(messageWithPartialMetadata.inboxMetadata?.icon).toBeUndefined();
    });

    it('should handle filter function that returns false for all messages', () => {
      const filterFn = (_message: IterableInAppMessage) => false;
      dataModel.set(filterFn);

      // Test that the filter function is set correctly
      expect(dataModel.filterFn).toBe(filterFn);
      expect(dataModel.filterFn!(mockMessage1)).toBe(false);
      expect(dataModel.filterFn!(mockMessage2)).toBe(false);
      expect(dataModel.filterFn!(mockMessage3)).toBe(false);
    });

    it('should handle comparator function that returns 0 for all comparisons', () => {
      const comparatorFn = (_msg1: IterableInAppMessage, _msg2: IterableInAppMessage) => 0;
      dataModel.set(undefined, comparatorFn);

      // Test that the comparator function is set correctly
      expect(dataModel.comparatorFn).toBe(comparatorFn);
      expect(dataModel.comparatorFn!(mockMessage1, mockMessage2)).toBe(0);
      expect(dataModel.comparatorFn!(mockMessage2, mockMessage3)).toBe(0);
    });
  });

  describe('integration tests', () => {
    it('should work with all functions set together', () => {
      const filterFn = (message: IterableInAppMessage) => message.saveToInbox === true;
      const comparatorFn = (msg1: IterableInAppMessage, msg2: IterableInAppMessage) =>
        msg2.priorityLevel - msg1.priorityLevel; // Higher priority first
      const dateMapperFn = (_message: IterableInAppMessage) =>
        mockMessage1.createdAt?.toISOString() ?? 'No date';

      dataModel.set(filterFn, comparatorFn, dateMapperFn);

      // Test that all functions are set correctly
      expect(dataModel.filterFn).toBe(filterFn);
      expect(dataModel.comparatorFn).toBe(comparatorFn);
      expect(dataModel.dateMapperFn).toBe(dateMapperFn);

      // Test filter function
      expect(dataModel.filterFn!(mockMessage1)).toBe(true); // saveToInbox = true
      expect(dataModel.filterFn!(mockMessage2)).toBe(true); // saveToInbox = true
      expect(dataModel.filterFn!(mockMessage3)).toBe(false); // saveToInbox = false

      // Test comparator function
      expect(dataModel.comparatorFn!(mockMessage1, mockMessage2)).toBe(-2); // 3 - 5 = -2
      expect(dataModel.comparatorFn!(mockMessage2, mockMessage3)).toBe(-2); // 1 - 3 = -2

      // Test date mapper function
      expect(dataModel.dateMapperFn!(mockMessage1)).toContain('2023-01-01');
    });

    it('should handle date formatting with custom mapper', () => {
      const customDateMapper = (_message: IterableInAppMessage) => 'Custom: 2023';
      dataModel.set(undefined, undefined, customDateMapper);

      const result = dataModel.getFormattedDate(mockMessage1);
      expect(result).toContain('Custom:');
    });
  });
});
