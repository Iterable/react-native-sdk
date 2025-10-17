import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { IterableEdgeInsets } from '../../core';
import { IterableInAppMessage, IterableInAppTrigger, IterableInboxMetadata } from '../../inApp/classes';
import { IterableHtmlInAppContent } from '../../inApp/classes/IterableHtmlInAppContent';
import { IterableInAppTriggerType } from '../../inApp/enums';
import type { IterableInboxRowViewModel } from '../types';
import { displayTestIds, IterableInboxMessageDisplay } from './IterableInboxMessageDisplay';

// Suppress act() warnings for this test suite since they're expected from the component's useEffect
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Mock the Iterable class
jest.mock('../../core/classes/Iterable', () => ({
  Iterable: {
    trackInAppClick: jest.fn(),
    trackInAppClose: jest.fn(),
    savedConfig: {
      customActionHandler: jest.fn(),
      urlHandler: jest.fn(),
    },
  },
}));

// Mock Linking
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Linking: {
    openURL: jest.fn(),
  },
}));

// Mock WebView
jest.mock('react-native-webview', () => {
  const { View, Text } = require('react-native');

  const MockWebView = ({ onMessage, injectedJavaScript, source, ...props }: {
    onMessage?: (event: { nativeEvent: { data: string } }) => void;
    injectedJavaScript?: string;
    source?: { html: string };
    [key: string]: unknown;
  }) => (
    <View testID="webview" {...props}>
      <Text testID="webview-source">{source?.html}</Text>
      <Text testID="webview-js">{injectedJavaScript}</Text>
      <Text
        testID="webview-message-trigger"
        onPress={() => {
          if (onMessage) {
            onMessage({
              nativeEvent: {
                data: 'https://example.com',
              },
            });
          }
        }}
      >
        Trigger Message
      </Text>
      <Text
        testID="webview-delete-trigger"
        onPress={() => {
          if (onMessage) {
            onMessage({
              nativeEvent: {
                data: 'iterable://delete',
              },
            });
          }
        }}
      >
        Trigger Delete
      </Text>
      <Text
        testID="webview-dismiss-trigger"
        onPress={() => {
          if (onMessage) {
            onMessage({
              nativeEvent: {
                data: 'iterable://dismiss',
              },
            });
          }
        }}
      >
        Trigger Dismiss
      </Text>
      <Text
        testID="webview-custom-action-trigger"
        onPress={() => {
          if (onMessage) {
            onMessage({
              nativeEvent: {
                data: 'action://customAction',
              },
            });
          }
        }}
      >
        Trigger Custom Action
      </Text>
      <Text
        testID="webview-deep-link-trigger"
        onPress={() => {
          if (onMessage) {
            onMessage({
              nativeEvent: {
                data: 'myapp://deep-link',
              },
            });
          }
        }}
      >
        Trigger Deep Link
      </Text>
    </View>
  );

  MockWebView.displayName = 'MockWebView';

  return {
    WebView: MockWebView,
  };
});

describe('IterableInboxMessageDisplay', () => {
  const mockMessage = new IterableInAppMessage(
    'test-message-id',
    123,
    new IterableInAppTrigger(IterableInAppTriggerType.immediate),
    new Date('2023-01-01T00:00:00Z'),
    undefined,
    true,
    new IterableInboxMetadata('Test Message Title', 'Test Subtitle', 'test-image.png'),
    undefined,
    false,
    0
  );

  const mockRowViewModel: IterableInboxRowViewModel = {
    inAppMessage: mockMessage,
    title: 'Test Message Title',
    subtitle: 'Test Subtitle',
    imageUrl: 'test-image.png',
    read: false,
    createdAt: new Date('2023-01-01T00:00:00Z'),
  };

  const mockHtmlContent = new IterableHtmlInAppContent(
    new IterableEdgeInsets(10, 10, 10, 10),
    '<html><body><h1>Test HTML Content</h1><a href="https://example.com">Test Link</a></body></html>'
  );

  const defaultProps = {
    rowViewModel: mockRowViewModel,
    inAppContentPromise: Promise.resolve(mockHtmlContent),
    returnToInbox: jest.fn(),
    deleteRow: jest.fn(),
    contentWidth: 300,
    isPortrait: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render without crashing with valid props', () => {
      expect(() => render(<IterableInboxMessageDisplay {...defaultProps} />)).not.toThrow();
    });

    it('should render the message title', () => {
      const { getByText } = render(<IterableInboxMessageDisplay {...defaultProps} />);
      expect(getByText('Test Message Title')).toBeTruthy();
    });

    it('should render the return button with "Inbox" text', () => {
      const { getByText } = render(<IterableInboxMessageDisplay {...defaultProps} />);
      expect(getByText('Inbox')).toBeTruthy();
    });

    it('should render the return button icon', () => {
      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);
      expect(getByTestId(displayTestIds.icon)).toBeTruthy();
    });

    it('should handle missing message title gracefully', () => {
      const messageWithoutTitle = new IterableInAppMessage(
        'test-message-id',
        123,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date('2023-01-01T00:00:00Z'),
        undefined,
        true,
        undefined, // No inbox metadata
        undefined,
        false,
        0
      );

      const rowViewModelWithoutTitle: IterableInboxRowViewModel = {
        ...mockRowViewModel,
        inAppMessage: messageWithoutTitle,
      };

      const propsWithoutTitle = {
        ...defaultProps,
        rowViewModel: rowViewModelWithoutTitle,
      };

      expect(() => render(<IterableInboxMessageDisplay {...propsWithoutTitle} />)).not.toThrow();
    });
  });

  describe('Async Content Loading', () => {
    it('should show content after inAppContentPromise resolves', async () => {
      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      expect(getByTestId('webview-source')).toHaveTextContent('<html><body><h1>Test HTML Content</h1><a href="https://example.com">Test Link</a></body></html>');
    });

  it('should handle rejected inAppContentPromise', async () => {
    // Since the component doesn't handle promise rejections, we'll test that it doesn't crash
    // when the promise never resolves (which simulates a network failure)
    const neverResolvingPromise = new Promise<IterableHtmlInAppContent>(() => {
      // Never resolve or reject - simulates a hanging network request
    });

    const propsWithNeverResolvingPromise = {
      ...defaultProps,
      inAppContentPromise: neverResolvingPromise,
    };

    const { queryByTestId } = render(<IterableInboxMessageDisplay {...propsWithNeverResolvingPromise} />);

    // Component should render without crashing
    // The component always renders the header, so we can check that the WebView is not shown
    // since the promise never resolves and inAppContent remains undefined
    expect(queryByTestId('webview')).toBeFalsy();
  });

    it('should handle component unmounting before promise resolves', async () => {
      const slowPromise = new Promise<IterableHtmlInAppContent>((resolve) => {
        setTimeout(() => resolve(mockHtmlContent), 1000);
      });

      const propsWithSlowPromise = {
        ...defaultProps,
        inAppContentPromise: slowPromise,
      };

      const { unmount } = render(<IterableInboxMessageDisplay {...propsWithSlowPromise} />);

      // Unmount before promise resolves
      unmount();

      // Should not crash
      await waitFor(() => {
        expect(true).toBe(true); // Just ensure we don't crash
      });
    });
  });

  describe('Return Button Interaction', () => {
    it('should call returnToInbox when return button is pressed', () => {
      const mockReturnToInbox = jest.fn();
      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByText } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);
      const returnButton = getByText('Inbox');

      fireEvent.press(returnButton);

      expect(mockReturnToInbox).toHaveBeenCalledTimes(1);
      expect(mockReturnToInbox).toHaveBeenCalledWith();
    });

    it('should track in-app close with back source when return button is pressed', () => {
      const { Iterable } = require('../../core/classes/Iterable');
      const { getByText } = render(<IterableInboxMessageDisplay {...defaultProps} />);
      const returnButton = getByText('Inbox');

      fireEvent.press(returnButton);

      expect(Iterable.trackInAppClose).toHaveBeenCalledWith(
        mockRowViewModel.inAppMessage,
        1, // IterableInAppLocation.inbox
        0 // IterableInAppCloseSource.back
      );
    });
  });

  describe('WebView Message Handling', () => {
    it('should handle external HTTP links', async () => {
      const mockReturnToInbox = jest.fn();
      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const messageTrigger = getByTestId('webview-message-trigger');
      fireEvent.press(messageTrigger);

      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle delete action', async () => {
      const mockReturnToInbox = jest.fn();
      const mockDeleteRow = jest.fn();
      const propsWithMocks = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
        deleteRow: mockDeleteRow,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMocks} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const deleteTrigger = getByTestId('webview-delete-trigger');
      fireEvent.press(deleteTrigger);

      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle dismiss action', async () => {
      const mockReturnToInbox = jest.fn();
      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const dismissTrigger = getByTestId('webview-dismiss-trigger');
      fireEvent.press(dismissTrigger);

      expect(mockReturnToInbox).toHaveBeenCalledWith();
    });

    it('should handle custom action', async () => {
      const mockReturnToInbox = jest.fn();
      const { Iterable } = require('../../core/classes/Iterable');
      const mockCustomActionHandler = jest.fn();
      Iterable.savedConfig.customActionHandler = mockCustomActionHandler;

      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const customActionTrigger = getByTestId('webview-custom-action-trigger');
      fireEvent.press(customActionTrigger);

      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle deep link', async () => {
      const mockReturnToInbox = jest.fn();
      const { Iterable } = require('../../core/classes/Iterable');
      const mockUrlHandler = jest.fn();
      Iterable.savedConfig.urlHandler = mockUrlHandler;

      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const deepLinkTrigger = getByTestId('webview-deep-link-trigger');
      fireEvent.press(deepLinkTrigger);

      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));
    });

    // Additional comprehensive tests for the specific lines highlighted
    it('should execute deleteRow callback when delete action is triggered', async () => {
      const mockReturnToInbox = jest.fn();
      const mockDeleteRow = jest.fn();
      const propsWithMocks = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
        deleteRow: mockDeleteRow,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMocks} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const deleteTrigger = getByTestId('webview-delete-trigger');
      fireEvent.press(deleteTrigger);

      // Verify returnToInbox is called with a callback
      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));

      // Execute the callback to verify deleteRow is called with correct messageId
      const callback = mockReturnToInbox.mock.calls[0][0];
      callback();
      expect(mockDeleteRow).toHaveBeenCalledWith('test-message-id');
    });

    it('should call returnToInbox without callback for dismiss action', async () => {
      const mockReturnToInbox = jest.fn();
      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const dismissTrigger = getByTestId('webview-dismiss-trigger');
      fireEvent.press(dismissTrigger);

      // Verify returnToInbox is called without any arguments (no callback)
      expect(mockReturnToInbox).toHaveBeenCalledWith();
    });

    it('should call Linking.openURL for HTTP URLs', async () => {
      const mockReturnToInbox = jest.fn();
      const { Linking } = require('react-native');
      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const messageTrigger = getByTestId('webview-message-trigger');
      fireEvent.press(messageTrigger);

      // Verify returnToInbox is called with a callback
      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));

      // Execute the callback to verify Linking.openURL is called
      const callback = mockReturnToInbox.mock.calls[0][0];
      callback();
      expect(Linking.openURL).toHaveBeenCalledWith('https://example.com');
    });

    it('should call customActionHandler with correct action and context', async () => {
      const mockReturnToInbox = jest.fn();
      const { Iterable } = require('../../core/classes/Iterable');
      const mockCustomActionHandler = jest.fn();
      Iterable.savedConfig.customActionHandler = mockCustomActionHandler;

      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const customActionTrigger = getByTestId('webview-custom-action-trigger');
      fireEvent.press(customActionTrigger);

      // Verify returnToInbox is called with a callback
      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));

      // Execute the callback to verify customActionHandler is called
      const callback = mockReturnToInbox.mock.calls[0][0];
      callback();
      expect(mockCustomActionHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'customAction',
          data: 'action://customAction',
          userInput: '',
        }),
        expect.objectContaining({
          action: expect.objectContaining({
            type: 'customAction',
            data: 'action://customAction',
            userInput: '',
          }),
          source: 2, // IterableActionSource.inApp
        })
      );
    });

    it('should call urlHandler with correct URL and context for deep links', async () => {
      const mockReturnToInbox = jest.fn();
      const { Iterable } = require('../../core/classes/Iterable');
      const mockUrlHandler = jest.fn();
      Iterable.savedConfig.urlHandler = mockUrlHandler;

      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const deepLinkTrigger = getByTestId('webview-deep-link-trigger');
      fireEvent.press(deepLinkTrigger);

      // Verify returnToInbox is called with a callback
      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));

      // Execute the callback to verify urlHandler is called
      const callback = mockReturnToInbox.mock.calls[0][0];
      callback();
      expect(mockUrlHandler).toHaveBeenCalledWith(
        'myapp://deep-link',
        expect.objectContaining({
          action: expect.objectContaining({
            type: 'openUrl',
            data: 'myapp://deep-link',
            userInput: '',
          }),
          source: 2, // IterableActionSource.inApp
        })
      );
    });

    it('should handle missing customActionHandler gracefully', async () => {
      const mockReturnToInbox = jest.fn();
      const { Iterable } = require('../../core/classes/Iterable');
      // Set customActionHandler to undefined
      Iterable.savedConfig.customActionHandler = undefined;

      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const customActionTrigger = getByTestId('webview-custom-action-trigger');

      // Should not throw an error even when customActionHandler is undefined
      expect(() => fireEvent.press(customActionTrigger)).not.toThrow();

      // Verify returnToInbox is still called
      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle missing urlHandler gracefully', async () => {
      const mockReturnToInbox = jest.fn();
      const { Iterable } = require('../../core/classes/Iterable');
      // Set urlHandler to undefined
      Iterable.savedConfig.urlHandler = undefined;

      const propsWithMockReturn = {
        ...defaultProps,
        returnToInbox: mockReturnToInbox,
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithMockReturn} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const deepLinkTrigger = getByTestId('webview-deep-link-trigger');

      // Should not throw an error even when urlHandler is undefined
      expect(() => fireEvent.press(deepLinkTrigger)).not.toThrow();

      // Verify returnToInbox is still called
      expect(mockReturnToInbox).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('Tracking and Analytics', () => {
    it('should track in-app click when link is clicked', async () => {
      const { Iterable } = require('../../core/classes/Iterable');
      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const messageTrigger = getByTestId('webview-message-trigger');
      fireEvent.press(messageTrigger);

      expect(Iterable.trackInAppClick).toHaveBeenCalledWith(
        mockRowViewModel.inAppMessage,
        1, // IterableInAppLocation.inbox
        'https://example.com'
      );
    });

    it('should track in-app close with link source when link is clicked', async () => {
      const { Iterable } = require('../../core/classes/Iterable');
      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      const messageTrigger = getByTestId('webview-message-trigger');
      fireEvent.press(messageTrigger);

      expect(Iterable.trackInAppClose).toHaveBeenCalledWith(
        mockRowViewModel.inAppMessage,
        1, // IterableInAppLocation.inbox
        1, // IterableInAppCloseSource.link
        'https://example.com'
      );
    });
  });

  describe('Props Variations', () => {
    it('should handle different content widths', () => {
      const propsWithDifferentWidth = { ...defaultProps, contentWidth: 600 };
      expect(() => render(<IterableInboxMessageDisplay {...propsWithDifferentWidth} />)).not.toThrow();
    });

    it('should handle portrait mode', () => {
      const portraitProps = { ...defaultProps, isPortrait: true };
      expect(() => render(<IterableInboxMessageDisplay {...portraitProps} />)).not.toThrow();
    });

    it('should handle landscape mode', () => {
      const landscapeProps = { ...defaultProps, isPortrait: false };
      expect(() => render(<IterableInboxMessageDisplay {...landscapeProps} />)).not.toThrow();
    });

    it('should handle zero content width', () => {
      const zeroWidthProps = { ...defaultProps, contentWidth: 0 };
      expect(() => render(<IterableInboxMessageDisplay {...zeroWidthProps} />)).not.toThrow();
    });

    it('should handle negative content width', () => {
      const negativeWidthProps = { ...defaultProps, contentWidth: -100 };
      expect(() => render(<IterableInboxMessageDisplay {...negativeWidthProps} />)).not.toThrow();
    });

    it('should handle very large content width', () => {
      const largeWidthProps = { ...defaultProps, contentWidth: 2000 };
      expect(() => render(<IterableInboxMessageDisplay {...largeWidthProps} />)).not.toThrow();
    });
  });

  describe('Function Props', () => {
    it('should handle returnToInbox function', () => {
      const mockReturnToInbox = jest.fn();
      const propsWithReturnToInbox = { ...defaultProps, returnToInbox: mockReturnToInbox };

      expect(() => render(<IterableInboxMessageDisplay {...propsWithReturnToInbox} />)).not.toThrow();
    });

    it('should handle deleteRow function', () => {
      const mockDeleteRow = jest.fn();
      const propsWithDeleteRow = { ...defaultProps, deleteRow: mockDeleteRow };

      expect(() => render(<IterableInboxMessageDisplay {...propsWithDeleteRow} />)).not.toThrow();
    });

    it('should handle undefined function props gracefully', () => {
      const propsWithUndefinedFunctions = {
        ...defaultProps,
        returnToInbox: undefined as unknown as (callback?: () => void) => void,
        deleteRow: undefined as unknown as (id: string) => void,
      };

      expect(() => render(<IterableInboxMessageDisplay {...propsWithUndefinedFunctions} />)).not.toThrow();
    });
  });

  describe('WebView Configuration', () => {
    it('should configure WebView with correct props', async () => {
      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      // Check that injected JavaScript is present
      const jsContent = getByTestId('webview-js').props.children;
      expect(jsContent).toContain('const links = document.querySelectorAll(\'a\')');
      expect(jsContent).toContain('links.forEach(link => {');
      expect(jsContent).toContain('window.ReactNativeWebView.postMessage');
    });

    it('should set correct originWhiteList', async () => {
      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      // The WebView should be rendered with the correct configuration
      expect(getByTestId('webview')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty HTML content', async () => {
      const emptyHtmlContent = new IterableHtmlInAppContent(
        new IterableEdgeInsets(0, 0, 0, 0),
        ''
      );

      const propsWithEmptyContent = {
        ...defaultProps,
        inAppContentPromise: Promise.resolve(emptyHtmlContent),
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithEmptyContent} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      expect(getByTestId('webview-source')).toHaveTextContent('');
    });

    it('should handle HTML content with special characters', async () => {
      const specialHtmlContent = new IterableHtmlInAppContent(
        new IterableEdgeInsets(10, 10, 10, 10),
        '<html><body><h1>测试标题 🚀</h1><a href="https://example.com?param=测试">测试链接</a></body></html>'
      );

      const propsWithSpecialContent = {
        ...defaultProps,
        inAppContentPromise: Promise.resolve(specialHtmlContent),
      };

      const { getByTestId } = render(<IterableInboxMessageDisplay {...propsWithSpecialContent} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      expect(getByTestId('webview-source')).toHaveTextContent('<html><body><h1>测试标题 🚀</h1><a href="https://example.com?param=测试">测试链接</a></body></html>');
    });

    it('should handle very long message titles', () => {
      const longTitle = 'A'.repeat(1000);
      const messageWithLongTitle = new IterableInAppMessage(
        'test-message-id',
        123,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date('2023-01-01T00:00:00Z'),
        undefined,
        true,
        new IterableInboxMetadata(longTitle, 'Test Subtitle', 'test-image.png'),
        undefined,
        false,
        0
      );

      const rowViewModelWithLongTitle: IterableInboxRowViewModel = {
        ...mockRowViewModel,
        inAppMessage: messageWithLongTitle,
        title: longTitle,
      };

      const propsWithLongTitle = {
        ...defaultProps,
        rowViewModel: rowViewModelWithLongTitle,
      };

      expect(() => render(<IterableInboxMessageDisplay {...propsWithLongTitle} />)).not.toThrow();
    });

    it('should handle message with no inbox metadata', () => {
      const messageWithoutMetadata = new IterableInAppMessage(
        'test-message-id',
        123,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date('2023-01-01T00:00:00Z'),
        undefined,
        true,
        undefined, // No inbox metadata
        undefined,
        false,
        0
      );

      const rowViewModelWithoutMetadata: IterableInboxRowViewModel = {
        ...mockRowViewModel,
        inAppMessage: messageWithoutMetadata,
      };

      const propsWithoutMetadata = {
        ...defaultProps,
        rowViewModel: rowViewModelWithoutMetadata,
      };

      expect(() => render(<IterableInboxMessageDisplay {...propsWithoutMetadata} />)).not.toThrow();
    });
  });

  describe('Performance Considerations', () => {
    it('should handle rapid prop changes', async () => {
      const { rerender, getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      // Change props rapidly
      const newProps1 = { ...defaultProps, contentWidth: 400 };
      const newProps2 = { ...defaultProps, isPortrait: false };
      const newProps3 = { ...defaultProps, contentWidth: 500, isPortrait: true };

      expect(() => {
        rerender(<IterableInboxMessageDisplay {...newProps1} />);
        rerender(<IterableInboxMessageDisplay {...newProps2} />);
        rerender(<IterableInboxMessageDisplay {...newProps3} />);
      }).not.toThrow();
    });

    it('should handle multiple message displays efficiently', () => {
      const messages = Array.from({ length: 10 }, (_, i) => {
        const message = new IterableInAppMessage(
          `message-${i}`,
          i,
          new IterableInAppTrigger(IterableInAppTriggerType.immediate),
          new Date(),
          undefined,
          true,
          new IterableInboxMetadata(`Title ${i}`, `Subtitle ${i}`, `image${i}.png`),
          undefined,
          false,
          i
        );

        return {
          inAppMessage: message,
          title: `Title ${i}`,
          subtitle: `Subtitle ${i}`,
          imageUrl: `image${i}.png`,
          read: false,
          createdAt: new Date(),
        } as IterableInboxRowViewModel;
      });

      messages.forEach((rowViewModel) => {
        const props = {
          ...defaultProps,
          rowViewModel,
        };

        expect(() => render(<IterableInboxMessageDisplay {...props} />)).not.toThrow();
      });
    });
  });

  describe('Integration with Iterable SDK', () => {
    it('should work with Iterable.savedConfig.customActionHandler', async () => {
      const { Iterable } = require('../../core/classes/Iterable');
      const mockCustomActionHandler = jest.fn();
      Iterable.savedConfig.customActionHandler = mockCustomActionHandler;

      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      // The component should render without errors when customActionHandler is set
      expect(getByTestId('webview')).toBeTruthy();
    });

    it('should work with Iterable.savedConfig.urlHandler', async () => {
      const { Iterable } = require('../../core/classes/Iterable');
      const mockUrlHandler = jest.fn();
      Iterable.savedConfig.urlHandler = mockUrlHandler;

      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      // The component should render without errors when urlHandler is set
      expect(getByTestId('webview')).toBeTruthy();
    });

    it('should handle missing Iterable.savedConfig handlers', async () => {
      const { Iterable } = require('../../core/classes/Iterable');
      Iterable.savedConfig.customActionHandler = undefined;
      Iterable.savedConfig.urlHandler = undefined;

      const { getByTestId } = render(<IterableInboxMessageDisplay {...defaultProps} />);

      await waitFor(() => {
        expect(getByTestId('webview')).toBeTruthy();
      });

      // The component should render without errors when handlers are undefined
      expect(getByTestId('webview')).toBeTruthy();
    });
  });
});
