import { MockRNIterableAPI } from '../__mocks__/MockRNIterableAPI';
import { IterableAuthManager } from '../core/classes/IterableAuthManager';
import type { IterableGenerateJwtTokenArgs } from '../core/types/IterableGenerateJwtTokenArgs';

describe('IterableAuthManager', () => {
  let authManager: IterableAuthManager;

  beforeEach(() => {
    jest.clearAllMocks();
    authManager = new IterableAuthManager();
  });

  describe('generateJwtToken', () => {
    test('should generate JWT token with email', async () => {
      // GIVEN an auth manager and JWT options with email
      const opts: IterableGenerateJwtTokenArgs = {
        secret: 'test-secret',
        duration: 3600000, // 1 hour in milliseconds
        email: 'test@example.com',
      };

      // WHEN generateJwtToken is called
      const token = await authManager.generateJwtToken(opts);

      // THEN the method should be called with the correct parameters
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenCalledWith(opts);
      // AND should return a token
      expect(token).toBe('mock-jwt-token');
    });

    test('should generate JWT token with userId', async () => {
      // GIVEN an auth manager and JWT options with userId
      const opts: IterableGenerateJwtTokenArgs = {
        secret: 'test-secret',
        duration: 3600000, // 1 hour in milliseconds
        userId: 'user123',
      };

      // WHEN generateJwtToken is called
      const token = await authManager.generateJwtToken(opts);

      // THEN the method should be called with the correct parameters
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenCalledWith(opts);
      // AND should return a token
      expect(token).toBe('mock-jwt-token');
    });

    test('should generate JWT token with custom duration', async () => {
      // GIVEN an auth manager and JWT options with custom duration
      const opts: IterableGenerateJwtTokenArgs = {
        secret: 'test-secret',
        duration: 86400000, // 1 day in milliseconds
        email: 'test@example.com',
      };

      // WHEN generateJwtToken is called
      const token = await authManager.generateJwtToken(opts);

      // THEN the method should be called with the correct parameters
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenCalledWith(opts);
      // AND should return a token
      expect(token).toBe('mock-jwt-token');
    });

    test('should handle generateJwtToken with different secret', async () => {
      // GIVEN an auth manager and JWT options with different secret
      const opts: IterableGenerateJwtTokenArgs = {
        secret: 'another-secret-key',
        duration: 7200000, // 2 hours in milliseconds
        userId: 'user456',
      };

      // WHEN generateJwtToken is called
      const token = await authManager.generateJwtToken(opts);

      // THEN the method should be called with the correct parameters
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenCalledWith(opts);
      // AND should return a token
      expect(token).toBe('mock-jwt-token');
    });

    test('should call native generateJwtToken only once per invocation', async () => {
      // GIVEN an auth manager and JWT options
      const opts: IterableGenerateJwtTokenArgs = {
        secret: 'test-secret',
        duration: 3600000,
        email: 'test@example.com',
      };

      // WHEN generateJwtToken is called
      await authManager.generateJwtToken(opts);

      // THEN the native method should be called exactly once
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple generateJwtToken calls', async () => {
      // GIVEN an auth manager and multiple JWT requests
      const opts1: IterableGenerateJwtTokenArgs = {
        secret: 'secret1',
        duration: 3600000,
        email: 'user1@example.com',
      };
      const opts2: IterableGenerateJwtTokenArgs = {
        secret: 'secret2',
        duration: 7200000,
        userId: 'user2',
      };

      // WHEN generateJwtToken is called multiple times
      const token1 = await authManager.generateJwtToken(opts1);
      const token2 = await authManager.generateJwtToken(opts2);

      // THEN both calls should succeed
      expect(token1).toBe('mock-jwt-token');
      expect(token2).toBe('mock-jwt-token');
      // AND the native method should be called twice with correct parameters
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenCalledTimes(2);
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenNthCalledWith(
        1,
        opts1
      );
      expect(MockRNIterableAPI.generateJwtToken).toHaveBeenNthCalledWith(
        2,
        opts2
      );
    });
  });

  describe('passAlongAuthToken', () => {
    test('should call native passAlongAuthToken with token', async () => {
      // GIVEN an auth manager and a token
      const token = 'test-token';

      // WHEN passAlongAuthToken is called
      await authManager.passAlongAuthToken(token);

      // THEN the native method should be called with the token
      expect(MockRNIterableAPI.passAlongAuthToken).toHaveBeenCalledWith(token);
    });

    test('should call native passAlongAuthToken with null', async () => {
      // GIVEN an auth manager

      // WHEN passAlongAuthToken is called with null
      await authManager.passAlongAuthToken(null);

      // THEN the native method should be called with null
      expect(MockRNIterableAPI.passAlongAuthToken).toHaveBeenCalledWith(null);
    });

    test('should call native passAlongAuthToken with undefined', async () => {
      // GIVEN an auth manager

      // WHEN passAlongAuthToken is called with undefined
      await authManager.passAlongAuthToken(undefined);

      // THEN the native method should be called with undefined
      expect(MockRNIterableAPI.passAlongAuthToken).toHaveBeenCalledWith(
        undefined
      );
    });
  });

  describe('pauseAuthRetries', () => {
    test('should call native pauseAuthRetries with true', () => {
      // GIVEN an auth manager

      // WHEN pauseAuthRetries is called with true
      authManager.pauseAuthRetries(true);

      // THEN the native method should be called with true
      expect(MockRNIterableAPI.pauseAuthRetries).toHaveBeenCalledWith(true);
    });

    test('should call native pauseAuthRetries with false', () => {
      // GIVEN an auth manager

      // WHEN pauseAuthRetries is called with false
      authManager.pauseAuthRetries(false);

      // THEN the native method should be called with false
      expect(MockRNIterableAPI.pauseAuthRetries).toHaveBeenCalledWith(false);
    });
  });
});
