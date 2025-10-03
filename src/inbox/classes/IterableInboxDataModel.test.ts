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
