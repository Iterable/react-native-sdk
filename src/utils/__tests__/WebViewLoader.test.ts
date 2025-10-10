import {
  loadWebView,
  loadWebViewMessageEventType,
  isWebViewAvailable,
} from '../WebViewLoader';

// Mock react-native-webview
jest.mock('react-native-webview', () => ({
  WebView: 'MockWebView',
  WebViewMessageEvent: 'MockWebViewMessageEvent',
}));

describe('WebViewLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isWebViewAvailable', () => {
    it('should return true when react-native-webview is available', () => {
      expect(isWebViewAvailable()).toBe(true);
    });
  });

  describe('loadWebView', () => {
    it('should load WebView component when available', () => {
      const WebView = loadWebView();
      expect(WebView).toBe('MockWebView');
    });
  });

  describe('loadWebViewMessageEventType', () => {
    it('should load WebViewMessageEvent type when available', () => {
      const WebViewMessageEvent = loadWebViewMessageEventType();
      expect(WebViewMessageEvent).toBe('MockWebViewMessageEvent');
    });
  });
});

describe('WebViewLoader without react-native-webview', () => {
  beforeEach(() => {
    // Clear the module cache and mock
    jest.resetModules();
    jest.doMock('react-native-webview', () => {
      throw new Error('Module not found');
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('isWebViewAvailable', () => {
    it('should return false when react-native-webview is not available', async () => {
      const { isWebViewAvailable: isAvailable } = await import(
        '../WebViewLoader'
      );
      expect(isAvailable()).toBe(false);
    });
  });

  describe('loadWebView', () => {
    it('should throw WebViewNotAvailableError when react-native-webview is not available', async () => {
      const { loadWebView: loadWebViewFn } = await import('../WebViewLoader');
      expect(() => loadWebViewFn()).toThrow(
        'react-native-webview is required but not installed'
      );
    });
  });

  describe('loadWebViewMessageEventType', () => {
    it('should throw WebViewNotAvailableError when react-native-webview is not available', async () => {
      const { loadWebViewMessageEventType: loadWebViewMessageEventTypeFn } =
        await import('../WebViewLoader');
      expect(() => loadWebViewMessageEventTypeFn()).toThrow(
        'react-native-webview is required but not installed'
      );
    });
  });
});
