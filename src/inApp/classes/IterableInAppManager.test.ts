import { IterableInAppDeleteSource, IterableInAppLocation } from '../enums';
import { IterableInAppManager } from './IterableInAppManager';
import { IterableInAppMessage } from './IterableInAppMessage';

describe('IterableInAppManager', () => {
  let manager: IterableInAppManager;

  beforeEach(() => {
    manager = new IterableInAppManager();
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      // WHEN creating a new manager
      const newManager = new IterableInAppManager();

      // THEN it should be an instance of IterableInAppManager
      expect(newManager).toBeInstanceOf(IterableInAppManager);
    });
  });

  describe('method signatures', () => {
    it('should have getMessages method', () => {
      // THEN the manager should have getMessages method
      expect(typeof manager.getMessages).toBe('function');
    });

    it('should have getInboxMessages method', () => {
      // THEN the manager should have getInboxMessages method
      expect(typeof manager.getInboxMessages).toBe('function');
    });

    it('should have showMessage method', () => {
      // THEN the manager should have showMessage method
      expect(typeof manager.showMessage).toBe('function');
    });

    it('should have removeMessage method', () => {
      // THEN the manager should have removeMessage method
      expect(typeof manager.removeMessage).toBe('function');
    });

    it('should have setReadForMessage method', () => {
      // THEN the manager should have setReadForMessage method
      expect(typeof manager.setReadForMessage).toBe('function');
    });

    it('should have getHtmlContentForMessage method', () => {
      // THEN the manager should have getHtmlContentForMessage method
      expect(typeof manager.getHtmlContentForMessage).toBe('function');
    });

    it('should have setAutoDisplayPaused method', () => {
      // THEN the manager should have setAutoDisplayPaused method
      expect(typeof manager.setAutoDisplayPaused).toBe('function');
    });
  });

  describe('getInboxMessages', () => {
    it('should be a function', () => {
      // THEN the method should be a function
      expect(typeof manager.getInboxMessages).toBe('function');
    });

    it('should have the correct method name', () => {
      // THEN the method should be named getInboxMessages
      expect(manager.getInboxMessages.name).toBe('getInboxMessages');
    });

    it('should be a different method from getMessages', () => {
      // THEN getInboxMessages should be different from getMessages
      expect(manager.getInboxMessages).not.toBe(manager.getMessages);
      expect(manager.getInboxMessages.name).not.toBe(manager.getMessages.name);
    });

    it('should return a Promise when called', async () => {
      // WHEN calling getInboxMessages
      const result = manager.getInboxMessages();

      // THEN it should return a Promise
      expect(result).toBeInstanceOf(Promise);
    });

    it('should return empty array when no inbox messages exist', async () => {
      // GIVEN no messages are set in the mock
      const { MockRNIterableAPI } = await import('../../__mocks__/MockRNIterableAPI');
      MockRNIterableAPI.setMessages([]);

      // WHEN calling getInboxMessages
      const result = await manager.getInboxMessages();

      // THEN it should return empty array
      expect(result).toEqual([]);
    });

    it('should return only inbox messages when mixed messages exist', async () => {
      // GIVEN mixed messages with some marked for inbox
      const { MockRNIterableAPI } = await import('../../__mocks__/MockRNIterableAPI');
      const mockMessages = [
        { messageId: 'msg1', campaignId: 1, saveToInbox: true } as IterableInAppMessage,
        { messageId: 'msg2', campaignId: 2, saveToInbox: false } as IterableInAppMessage,
        { messageId: 'msg3', campaignId: 3, saveToInbox: true } as IterableInAppMessage,
      ];
      MockRNIterableAPI.setMessages(mockMessages);

      // WHEN calling getInboxMessages
      const result = await manager.getInboxMessages();

      // THEN it should return only inbox messages
      expect(result).toHaveLength(2);
      expect(result?.[0]?.messageId).toBe('msg1');
      expect(result?.[1]?.messageId).toBe('msg3');
    });

    it('should return all messages when all are marked for inbox', async () => {
      // GIVEN all messages are marked for inbox
      const { MockRNIterableAPI } = await import('../../__mocks__/MockRNIterableAPI');
      const mockMessages = [
        { messageId: 'msg1', campaignId: 1, saveToInbox: true } as IterableInAppMessage,
        { messageId: 'msg2', campaignId: 2, saveToInbox: true } as IterableInAppMessage,
      ];
      MockRNIterableAPI.setMessages(mockMessages);

      // WHEN calling getInboxMessages
      const result = await manager.getInboxMessages();

      // THEN it should return all messages
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockMessages);
    });

    it('should handle undefined messages gracefully', async () => {
      // GIVEN messages are undefined
      const { MockRNIterableAPI } = await import('../../__mocks__/MockRNIterableAPI');
      MockRNIterableAPI.setMessages(undefined as unknown as IterableInAppMessage[]);

      // WHEN calling getInboxMessages
      const result = await manager.getInboxMessages();

      // THEN it should return empty array
      expect(result).toEqual([]);
    });
  });

  describe('showMessage parameters', () => {
    it('should accept IterableInAppMessage and boolean parameters', () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling showMessage with valid parameters
      // THEN it should not throw an error
      expect(() => {
        manager.showMessage(mockMessage, true);
        manager.showMessage(mockMessage, false);
      }).not.toThrow();
    });
  });

  describe('removeMessage parameters', () => {
    it('should accept IterableInAppMessage, IterableInAppLocation, and IterableInAppDeleteSource parameters', () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling removeMessage with valid parameters
      // THEN it should not throw an error
      expect(() => {
        manager.removeMessage(
          mockMessage,
          IterableInAppLocation.inApp,
          IterableInAppDeleteSource.deleteButton
        );
        manager.removeMessage(
          mockMessage,
          IterableInAppLocation.inbox,
          IterableInAppDeleteSource.inboxSwipe
        );
        manager.removeMessage(
          mockMessage,
          IterableInAppLocation.inApp,
          IterableInAppDeleteSource.unknown
        );
      }).not.toThrow();
    });
  });

  describe('setReadForMessage parameters', () => {
    it('should accept IterableInAppMessage and boolean parameters', () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling setReadForMessage with valid parameters
      // THEN it should not throw an error
      expect(() => {
        manager.setReadForMessage(mockMessage, true);
        manager.setReadForMessage(mockMessage, false);
      }).not.toThrow();
    });
  });

  describe('getHtmlContentForMessage', () => {
    it('should be a function', () => {
      // THEN the method should be a function
      expect(typeof manager.getHtmlContentForMessage).toBe('function');
    });

    it('should return a Promise when called', async () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling getHtmlContentForMessage
      const result = manager.getHtmlContentForMessage(mockMessage);

      // THEN it should return a Promise
      expect(result).toBeInstanceOf(Promise);
    });

    it('should return HTML content for a message', async () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling getHtmlContentForMessage
      const result = await manager.getHtmlContentForMessage(mockMessage);

      // THEN it should return HTML content
      expect(result).toEqual({
        edgeInsets: { top: 10, left: 20, bottom: 30, right: 40 },
        html: '<div>Mock HTML content for message test-message-id</div>',
      });
    });

    it('should handle different message IDs', async () => {
      // GIVEN different mock messages
      const message1 = { messageId: 'msg1', campaignId: 1 } as IterableInAppMessage;
      const message2 = { messageId: 'msg2', campaignId: 2 } as IterableInAppMessage;

      // WHEN calling getHtmlContentForMessage with different messages
      const result1 = await manager.getHtmlContentForMessage(message1);
      const result2 = await manager.getHtmlContentForMessage(message2);

      // THEN it should return different HTML content for each message
      expect(result1).toEqual({
        edgeInsets: { top: 10, left: 20, bottom: 30, right: 40 },
        html: '<div>Mock HTML content for message msg1</div>',
      });
      expect(result2).toEqual({
        edgeInsets: { top: 10, left: 20, bottom: 30, right: 40 },
        html: '<div>Mock HTML content for message msg2</div>',
      });
    });
  });

  describe('setAutoDisplayPaused parameters', () => {
    it('should accept boolean parameter', () => {
      // WHEN calling setAutoDisplayPaused with valid parameters
      // THEN it should not throw an error
      expect(() => {
        manager.setAutoDisplayPaused(true);
        manager.setAutoDisplayPaused(false);
      }).not.toThrow();
    });
  });

  describe('enum values', () => {
    it('should have correct IterableInAppLocation enum values', () => {
      // THEN the enum values should be correct
      expect(IterableInAppLocation.inApp).toBe(0);
      expect(IterableInAppLocation.inbox).toBe(1);
    });

    it('should have correct IterableInAppDeleteSource enum values', () => {
      // THEN the enum values should be correct
      expect(IterableInAppDeleteSource.inboxSwipe).toBe(0);
      expect(IterableInAppDeleteSource.deleteButton).toBe(1);
      expect(IterableInAppDeleteSource.unknown).toBe(100);
    });
  });

  describe('method return types', () => {
    it('should return Promise for async methods', () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling async methods that don't require native modules
      const showMessagePromise = manager.showMessage(mockMessage, true);

      // THEN they should return Promises
      expect(showMessagePromise).toBeInstanceOf(Promise);
    });

    it('should return void for sync methods', () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling sync methods
      const removeMessageResult = manager.removeMessage(
        mockMessage,
        IterableInAppLocation.inApp,
        IterableInAppDeleteSource.deleteButton
      );
      const setReadResult = manager.setReadForMessage(mockMessage, true);
      const setAutoDisplayResult = manager.setAutoDisplayPaused(true);

      // THEN they should return undefined (void)
      expect(removeMessageResult).toBeUndefined();
      expect(setReadResult).toBeUndefined();
      expect(setAutoDisplayResult).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should handle null message parameters', () => {
      // WHEN calling methods with null message
      // THEN it should throw appropriate errors
      expect(() => {
        manager.removeMessage(null as unknown as IterableInAppMessage, IterableInAppLocation.inApp, IterableInAppDeleteSource.unknown);
      }).toThrow();

      expect(() => {
        manager.setReadForMessage(null as unknown as IterableInAppMessage, true);
      }).toThrow();

      expect(() => {
        manager.getHtmlContentForMessage(null as unknown as IterableInAppMessage);
      }).toThrow();
    });

    it('should handle undefined message parameters', () => {
      // WHEN calling methods with undefined message
      // THEN it should throw appropriate errors
      expect(() => {
        manager.removeMessage(undefined as unknown as IterableInAppMessage, IterableInAppLocation.inApp, IterableInAppDeleteSource.unknown);
      }).toThrow();

      expect(() => {
        manager.setReadForMessage(undefined as unknown as IterableInAppMessage, true);
      }).toThrow();

      expect(() => {
        manager.getHtmlContentForMessage(undefined as unknown as IterableInAppMessage);
      }).toThrow();
    });
  });

  describe('parameter validation', () => {
    it('should handle invalid enum values gracefully', () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling removeMessage with invalid enum values
      // THEN it should not throw an error (values are passed through)
      expect(() => {
        manager.removeMessage(mockMessage, 999 as IterableInAppLocation, 888 as IterableInAppDeleteSource);
      }).not.toThrow();
    });

    it('should handle invalid boolean parameters', () => {
      // GIVEN a mock message
      const mockMessage = {
        messageId: 'test-message-id',
        campaignId: 123,
      } as IterableInAppMessage;

      // WHEN calling methods with invalid boolean parameters
      // THEN it should not throw an error (values are passed through)
      expect(() => {
        manager.showMessage(mockMessage, 'true' as unknown as boolean);
        manager.setReadForMessage(mockMessage, 'false' as unknown as boolean);
        manager.setAutoDisplayPaused('true' as unknown as boolean);
      }).not.toThrow();
    });
  });
});
