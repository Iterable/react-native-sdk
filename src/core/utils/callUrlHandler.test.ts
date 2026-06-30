import { Linking } from 'react-native';

import { IterableAction } from '../classes/IterableAction';
import { IterableActionContext } from '../classes/IterableActionContext';
import { IterableConfig } from '../classes/IterableConfig';
import { IterableActionSource } from '../enums/IterableActionSource';
import { callUrlHandler } from './callUrlHandler';

// Mock the IterableLogger so we can assert calls without depending on its
// concrete implementation.
jest.mock('../classes/IterableLogger', () => ({
  IterableLogger: {
    log: jest.fn(),
  },
}));

// Import the mocked logger after the mock is registered.
const { IterableLogger } = require('../classes/IterableLogger');

describe('callUrlHandler', () => {
  let canOpenURLSpy: jest.SpyInstance;
  let openURLSpy: jest.SpyInstance;
  let config: IterableConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    canOpenURLSpy = jest.spyOn(Linking, 'canOpenURL');
    openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    config = new IterableConfig();
  });

  afterEach(() => {
    canOpenURLSpy.mockRestore();
    openURLSpy.mockRestore();
  });

  const buildContext = (url: string): IterableActionContext => {
    return new IterableActionContext(
      new IterableAction('openUrl', url),
      IterableActionSource.push
    );
  };

  describe('urlHandler returns false (falls through to Linking)', () => {
    it('opens the URL when Linking.canOpenURL resolves true', async () => {
      // GIVEN a config whose urlHandler returns false
      config.urlHandler = jest.fn().mockReturnValue(false);
      canOpenURLSpy.mockResolvedValue(true);
      const url = 'https://example.com';

      // WHEN callUrlHandler is invoked
      callUrlHandler(config, url, buildContext(url));

      // THEN the microtask queue flushes the resolved canOpenURL
      await Promise.resolve();
      await Promise.resolve();

      expect(canOpenURLSpy).toHaveBeenCalledWith(url);
      expect(openURLSpy).toHaveBeenCalledWith(url);
    });

    it('logs when Linking.canOpenURL resolves false', async () => {
      config.urlHandler = jest.fn().mockReturnValue(false);
      canOpenURLSpy.mockResolvedValue(false);
      const url = 'https://example.com';

      callUrlHandler(config, url, buildContext(url));

      await Promise.resolve();
      await Promise.resolve();

      expect(canOpenURLSpy).toHaveBeenCalledWith(url);
      expect(openURLSpy).not.toHaveBeenCalled();
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Url cannot be opened: ' + url
      );
    });

    it('logs the error when Linking.canOpenURL rejects', async () => {
      // GIVEN a config whose urlHandler returns false and a canOpenURL that rejects
      config.urlHandler = jest.fn().mockReturnValue(false);
      const rejectionReason = 'boom';
      canOpenURLSpy.mockRejectedValue(rejectionReason);
      const url = 'https://example.com';

      // WHEN callUrlHandler is invoked
      callUrlHandler(config, url, buildContext(url));

      // THEN the rejection branch fires and IterableLogger.log is called with the reason
      await Promise.resolve();
      await Promise.resolve();

      expect(canOpenURLSpy).toHaveBeenCalledWith(url);
      expect(openURLSpy).not.toHaveBeenCalled();
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Error opening url: ' + rejectionReason
      );
    });
  });

  describe('urlHandler returns true', () => {
    it('does not call Linking when urlHandler returns true', () => {
      config.urlHandler = jest.fn().mockReturnValue(true);
      const url = 'https://example.com';

      callUrlHandler(config, url, buildContext(url));

      expect(canOpenURLSpy).not.toHaveBeenCalled();
      expect(openURLSpy).not.toHaveBeenCalled();
    });
  });

  describe('urlHandler not configured', () => {
    it('falls through to Linking when urlHandler is undefined', async () => {
      // config.urlHandler is undefined by default
      canOpenURLSpy.mockResolvedValue(true);
      const url = 'https://example.com';

      callUrlHandler(config, url, buildContext(url));

      await Promise.resolve();
      await Promise.resolve();

      expect(canOpenURLSpy).toHaveBeenCalledWith(url);
      expect(openURLSpy).toHaveBeenCalledWith(url);
    });
  });
});