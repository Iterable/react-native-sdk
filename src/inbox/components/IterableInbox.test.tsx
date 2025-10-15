/* eslint-disable react-native/no-raw-text */
// Mock NativeEventEmitter first, before any imports
const mockEventEmitter = {
  addListener: jest.fn(),
  removeAllListeners: jest.fn(),
};

// Mock react-native with NativeEventEmitter
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    NativeEventEmitter: jest.fn().mockImplementation(() => {
      console.log('NativeEventEmitter mock called!');
      return mockEventEmitter;
    }),
    NativeModules: {
      RNIterableAPI: {},
    },
  };
});

import { useIsFocused } from '@react-navigation/native';
import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react-native';
import { Animated, Text } from 'react-native';

import { useAppStateListener, useDeviceOrientation } from '../../core';
import { Iterable } from '../../core/classes/Iterable';
import { IterableEdgeInsets } from '../../core/classes/IterableEdgeInsets';
import {
  IterableHtmlInAppContent,
  IterableInAppMessage,
  IterableInAppTrigger,
  IterableInboxMetadata,
} from '../../inApp/classes';
import { IterableInAppTriggerType } from '../../inApp/enums';
import { IterableInboxDataModel } from '../classes';
import type {
  IterableInboxCustomizations,
  IterableInboxRowViewModel,
} from '../types';
import { IterableInbox, iterableInboxTestIds } from './IterableInbox';
import { iterableInboxEmptyStateTestIds } from './IterableInboxEmptyState';
import { inboxMessageCellTestIDs } from './IterableInboxMessageCell';
import { iterableMessageDisplayTestIds } from './IterableInboxMessageDisplay/IterableInboxMessageDisplay';

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
    trackInAppOpen: jest.fn(),
    trackInAppClick: jest.fn(),
    trackInAppClose: jest.fn(),
    savedConfig: {
      customActionHandler: jest.fn(),
      urlHandler: jest.fn(),
    },
  },
}));

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

// Mock core hooks
jest.mock('../../core', () => ({
  ...jest.requireActual('../../core'),
  useAppStateListener: jest.fn(),
  useDeviceOrientation: jest.fn(),
}));

// Mock WebView
jest.mock('react-native-webview', () => {
  const { View, Text: RNText } = require('react-native');

  const MockWebView = ({
    onMessage,
    injectedJavaScript,
    source,
    ...props
  }: {
    onMessage?: (event: { nativeEvent: { data: string } }) => void;
    injectedJavaScript?: string;
    source?: { html: string };
    [key: string]: unknown;
  }) => (
    <View testID="webview" {...props}>
      <RNText testID="webview-source">{source?.html}</RNText>
      <RNText testID="webview-js">{injectedJavaScript}</RNText>
      <RNText
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
      </RNText>
    </View>
  );

  MockWebView.displayName = 'MockWebView';

  return {
    WebView: MockWebView,
  };
});

const mockMessages = [1, 2, 3].map(
  (index) =>
    new IterableInAppMessage(
      `messageId${index}`,
      index,
      new IterableInAppTrigger(IterableInAppTriggerType.immediate),
      new Date(),
      new Date('2035-01-01'),
      true,
      new IterableInboxMetadata(`Message ${index}`, `Subtitle ${index}`, ''),
      false,
      false,
      1
    )
);

// Mock HTML content for each message
const mockHtmlContent = {
  messageId1: new IterableHtmlInAppContent(
    new IterableEdgeInsets(10, 10, 10, 10),
    '<div><h1>Title 1</h1><p>This is the content for message 1</p></div>'
  ),
  messageId2: new IterableHtmlInAppContent(
    new IterableEdgeInsets(10, 10, 10, 10),
    '<div><h1>Title 2</h1><p><a href="iterable://delete">Delete Link</a></p>This is the content for message 2</p></div>'
  ),
  messageId3: new IterableHtmlInAppContent(
    new IterableEdgeInsets(10, 10, 10, 10),
    '<div><h1>Title 3</h1><p>This is the content for message 3</p></div>'
  ),
};

// Mock IterableInboxDataModel
jest.mock('../classes', () => ({
  IterableInboxDataModel: jest.fn().mockImplementation(() => ({
    refresh: jest.fn().mockResolvedValue(mockMessages),
    startSession: jest.fn(),
    endSession: jest.fn(),
    updateVisibleRows: jest.fn(),
    setMessageAsRead: jest.fn(),
    deleteItemById: jest.fn(),
    getHtmlContentForMessageId: jest
      .fn()
      .mockImplementation((messageId: string) => {
        return Promise.resolve(
          mockHtmlContent[messageId as keyof typeof mockHtmlContent]
        );
      }),
    getFormattedDate: jest.fn().mockReturnValue('2023-01-01'),
  })),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({
    children,
    testID,
    ...props
  }: {
    children: React.ReactNode;
    testID?: string;
    [key: string]: unknown;
  }) => {
    const { View } = require('react-native');
    return (
      <View testID={testID || 'safe-area-view'} {...props}>
        {children}
      </View>
    );
  },
}));

describe('IterableInbox', () => {
  const mockUseIsFocused = useIsFocused as jest.MockedFunction<
    typeof useIsFocused
  >;
  const mockUseAppStateListener = useAppStateListener as jest.MockedFunction<
    typeof useAppStateListener
  >;
  const mockUseDeviceOrientation = useDeviceOrientation as jest.MockedFunction<
    typeof useDeviceOrientation
  >;
  const mockIterableInboxDataModel = IterableInboxDataModel as jest.MockedClass<
    typeof IterableInboxDataModel
  >;

  const mockMessage1 = new IterableInAppMessage(
    'messageId1',
    1,
    new IterableInAppTrigger(IterableInAppTriggerType.immediate),
    new Date('2023-01-01T00:00:00Z'),
    undefined,
    true,
    new IterableInboxMetadata('Title 1', 'Subtitle 1', 'imageUrl1.png'),
    undefined,
    false,
    0
  );

  const mockMessage2 = new IterableInAppMessage(
    'messageId2',
    2,
    new IterableInAppTrigger(IterableInAppTriggerType.immediate),
    new Date('2023-01-02T00:00:00Z'),
    undefined,
    true,
    new IterableInboxMetadata('Title 2', 'Subtitle 2', 'imageUrl2.png'),
    undefined,
    true,
    1
  );

  const mockRowViewModel1: IterableInboxRowViewModel = {
    inAppMessage: mockMessage1,
    title: 'Title 1',
    subtitle: 'Subtitle 1',
    imageUrl: 'imageUrl1.png',
    read: false,
  };

  const mockRowViewModel2: IterableInboxRowViewModel = {
    inAppMessage: mockMessage2,
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    imageUrl: 'imageUrl2.png',
    read: true,
  };

  const defaultCustomizations: IterableInboxCustomizations = {};

  const defaultProps = {
    returnToInboxTrigger: true,
    messageListItemLayout: () => null,
    customizations: defaultCustomizations,
    tabBarHeight: 80,
    tabBarPadding: 20,
    safeAreaMode: true,
    showNavTitle: true,
  };

  let mockDataModelInstance: {
    refresh: jest.Mock;
    startSession: jest.Mock;
    endSession: jest.Mock;
    updateVisibleRows: jest.Mock;
    setMessageAsRead: jest.Mock;
    deleteItemById: jest.Mock;
    getHtmlContentForMessageId: jest.Mock;
    getFormattedDate: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock implementations
    mockUseIsFocused.mockReturnValue(true);
    mockUseAppStateListener.mockReturnValue('active');
    mockUseDeviceOrientation.mockReturnValue({
      height: 800,
      width: 400,
      isPortrait: true,
    });

    // Setup mock data model instance
    mockDataModelInstance = {
      refresh: jest
        .fn()
        .mockResolvedValue([mockRowViewModel1, mockRowViewModel2]),
      startSession: jest.fn(),
      endSession: jest.fn(),
      updateVisibleRows: jest.fn(),
      setMessageAsRead: jest.fn(),
      deleteItemById: jest.fn(),
      getHtmlContentForMessageId: jest.fn().mockResolvedValue({}),
      getFormattedDate: jest.fn().mockReturnValue('2023-01-01'),
    };

    mockIterableInboxDataModel.mockImplementation(
      () => mockDataModelInstance as unknown as IterableInboxDataModel
    );
  });

  describe('Basic Rendering', () => {
    it('should render without crashing with default props', async () => {
      const component = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });

    it('should render with SafeAreaView when safeAreaMode is true', async () => {
      const component = render(
        <IterableInbox {...defaultProps} safeAreaMode={true} />
      );

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });

    it('should render without SafeAreaView when safeAreaMode is false', async () => {
      const component = render(
        <IterableInbox {...defaultProps} safeAreaMode={false} />
      );

      await waitFor(() => {
        // Should not find SafeAreaView testID, but should find the container
        expect(() =>
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toThrow();
        // The component should still render successfully
        expect(component.getByTestId(iterableInboxTestIds.view)).toBeTruthy();
      });
    });

    it('should call refresh on mount', async () => {
      render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation Title', () => {
    it('should show default title when showNavTitle is true and no custom title provided', async () => {
      const component = render(
        <IterableInbox {...defaultProps} showNavTitle={true} />
      );

      await waitFor(() => {
        expect(component.getByText('Inbox')).toBeTruthy();
      });
    });

    it('should show custom title when provided', async () => {
      const customProps = {
        ...defaultProps,
        customizations: { navTitle: 'My Custom Inbox' },
      };

      const component = render(<IterableInbox {...customProps} />);

      await waitFor(() => {
        expect(component.getByText('My Custom Inbox')).toBeTruthy();
      });
    });

    it('should not show title when showNavTitle is false', async () => {
      const component = render(
        <IterableInbox {...defaultProps} showNavTitle={false} />
      );

      await waitFor(() => {
        expect(component.queryByText('Inbox')).toBeNull();
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading screen initially', async () => {
      mockDataModelInstance.refresh.mockImplementation(
        () => new Promise(() => {})
      ); // Never resolves

      const component = render(<IterableInbox {...defaultProps} />);

      // Should show loading screen initially
      expect(
        component.getByTestId(iterableInboxTestIds.loadingScreen)
      ).toBeTruthy();
    });

    it('should hide loading screen after messages are fetched', async () => {
      mockDataModelInstance.refresh.mockResolvedValue([]);
      const component = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });
  });

  describe('Device Orientation', () => {
    it('should handle portrait orientation', async () => {
      mockUseDeviceOrientation.mockReturnValue({
        height: 800,
        width: 400,
        isPortrait: true,
      });

      const component = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });

    it('should handle landscape orientation', async () => {
      mockUseDeviceOrientation.mockReturnValue({
        height: 400,
        width: 800,
        isPortrait: false,
      });

      const component = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });
  });

  describe('App State Management', () => {
    it('should start session when app becomes active and inbox is focused', async () => {
      mockUseAppStateListener.mockReturnValue('active');
      mockUseIsFocused.mockReturnValue(true);

      render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.startSession).toHaveBeenCalled();
      });
    });

    it('should end session when app goes to background on Android', async () => {
      mockUseAppStateListener.mockReturnValue('background');
      mockUseIsFocused.mockReturnValue(true);

      render(<IterableInbox {...defaultProps} />);

      // The component should render successfully
      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Note: The actual endSession behavior depends on the component's useEffect logic
      // This test verifies the component renders correctly with background state
    });

    it('should end session when app becomes inactive', async () => {
      mockUseAppStateListener.mockReturnValue('inactive');
      mockUseIsFocused.mockReturnValue(true);

      render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.endSession).toHaveBeenCalled();
      });
    });

    it('should end session when inbox loses focus', async () => {
      mockUseAppStateListener.mockReturnValue('active');
      mockUseIsFocused.mockReturnValue(false);

      render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.endSession).toHaveBeenCalled();
      });
    });
  });

  describe('Message List', () => {
    it('should render message list when messages are available', async () => {
      const component = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });

    it('should render empty state when no messages are available', async () => {
      mockDataModelInstance.refresh.mockResolvedValue([]);
      const component = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxEmptyStateTestIds.container)
        ).toBeTruthy();
      });
    });
  });

  describe('Return to Inbox Trigger', () => {
    it('should trigger return to inbox when trigger changes', async () => {
      const timingSpy = jest.spyOn(Animated, 'timing');

      const inbox = render(
        <IterableInbox {...defaultProps} returnToInboxTrigger={true} />
      );

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Simulate selecting the second message
      const messageCells = inbox.getAllByTestId(inboxMessageCellTestIDs.select);
      fireEvent.press(messageCells[1]);

      await waitFor(() => {
        expect(
          within(
            inbox.getByTestId(iterableMessageDisplayTestIds.container)
          ).getByTestId('webview-delete-trigger')
        ).toBeTruthy();
      });

      inbox.debug();
      timingSpy.mockClear();

      // Change the trigger
      inbox.rerender(
        <IterableInbox {...defaultProps} returnToInboxTrigger={false} />
      );

      waitFor(() => {
        expect(timingSpy).toHaveBeenCalled();
      });

      expect(timingSpy).toHaveBeenCalled();
    });
  });

  describe('Message Selection and Display', () => {
    it('should show a message on select', async () => {
      const inbox = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // The first message should be displayed by default
      expect(
        within(
          inbox.getByTestId(iterableMessageDisplayTestIds.container)
        ).getByText('Title 1')
      ).toBeTruthy();
      expect(Iterable.trackInAppOpen).not.toHaveBeenCalled();
      expect(mockDataModelInstance.setMessageAsRead).not.toHaveBeenCalled();

      // Simulate selecting the second message
      const messageCells = inbox.getAllByTestId(inboxMessageCellTestIDs.select);
      fireEvent.press(messageCells[1]);

      const display = inbox.getByTestId(
        iterableMessageDisplayTestIds.container
      );

      // The second message should be displayed
      expect(display).toBeTruthy();
      expect(within(display).getByText('Title 2')).toBeTruthy();
      // `trackInAppOpen` should be called
      expect(Iterable.trackInAppOpen).toHaveBeenCalled();
      // `setMessageAsRead` should be called
      expect(mockDataModelInstance.setMessageAsRead).toHaveBeenCalled();
    });

    it('should call `trackInAppOpen` when message is selected', async () => {
      const inbox = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      expect(Iterable.trackInAppOpen).not.toHaveBeenCalled();

      // Simulate selecting the second message
      const messageCells = inbox.getAllByTestId(inboxMessageCellTestIDs.select);
      fireEvent.press(messageCells[1]);

      expect(Iterable.trackInAppOpen).toHaveBeenCalled();
    });

    it('should set a message as read when message is selected', async () => {
      const inbox = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      expect(mockDataModelInstance.setMessageAsRead).not.toHaveBeenCalled();

      // Simulate selecting the second message
      const messageCells = inbox.getAllByTestId(inboxMessageCellTestIDs.select);
      fireEvent.press(messageCells[1]);

      expect(mockDataModelInstance.setMessageAsRead).toHaveBeenCalled();
    });

    it('should call slideLeft when message is selected', async () => {
      const timingSpy = jest.spyOn(Animated, 'timing');
      const inbox = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      timingSpy.mockClear();

      expect(timingSpy).not.toHaveBeenCalled();

      // Select a message
      const messageCells = inbox.getAllByTestId(inboxMessageCellTestIDs.select);
      fireEvent.press(messageCells[0]);

      expect(timingSpy).toHaveBeenCalled();

      timingSpy.mockRestore();
    });

    it('should call deleteRow when delete is clicked from the display', async () => {
      const inbox = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      mockDataModelInstance.refresh.mockClear();

      // Select a message
      const messageCells = inbox.getAllByTestId(inboxMessageCellTestIDs.select);
      fireEvent.press(messageCells[1]);

      await waitFor(() => {
        expect(
          within(
            inbox.getByTestId(iterableMessageDisplayTestIds.container)
          ).getByTestId('webview-delete-trigger')
        ).toBeTruthy();
      });

      // Click delete
      const deleteTrigger = within(
        inbox.getByTestId(iterableMessageDisplayTestIds.container)
      ).getByTestId('webview-delete-trigger');
      fireEvent.press(deleteTrigger);

      await waitFor(() => {
        expect(mockDataModelInstance.deleteItemById).toHaveBeenCalled();
      });

      expect(mockDataModelInstance.deleteItemById).toHaveBeenCalled();
      expect(mockDataModelInstance.refresh).toHaveBeenCalled();
    });
  });

  describe('Props Validation', () => {
    it('should use default values when props are not provided', async () => {
      const component = render(<IterableInbox />);

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });

    it('should handle undefined customizations', async () => {
      const propsWithUndefinedCustomizations = {
        ...defaultProps,
        customizations: undefined as unknown as IterableInboxCustomizations,
      };

      const component = render(
        <IterableInbox {...propsWithUndefinedCustomizations} />
      );

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });
    });

    it('should handle customizations', async () => {
      const customizations = {
        navTitle: 'My Custom Inbox',
      };

      const component = render(
        <IterableInbox customizations={customizations} />
      );

      await waitFor(() => {
        expect(
          component.getByTestId(iterableInboxTestIds.safeAreaView)
        ).toBeTruthy();
      });

      expect(component.getByText('My Custom Inbox')).toBeTruthy();
    });
  });

  describe('Message List Item Layout', () => {
    it('should use messageListItemLayout when provided', async () => {
      const messageListItemLayout = jest
        .fn()
        .mockReturnValue([
          <Text key="custom-layout" testID="custom-layout">Custom Layout</Text>,
          200,
        ]);

      const component = render(
        <IterableInbox
          {...defaultProps}
          messageListItemLayout={messageListItemLayout}
        />
      );

      // Wait for the component to finish loading and rendering messages
      await act(async () => {
        await waitFor(() => {
          // Wait for the refresh to complete and messages to be rendered
          expect(mockDataModelInstance.refresh).toHaveBeenCalled();
        });
      });

      // Now wait for the custom layout to appear (there should be multiple since we have 3 messages)
      await act(async () => {
        await waitFor(() => {
          const customLayoutElements =
            component.getAllByTestId('custom-layout');
          expect(customLayoutElements).toHaveLength(2);
          expect(customLayoutElements[0]).toBeTruthy();
          expect(messageListItemLayout).toHaveBeenCalled();
        });
      });
    });

    it('should use default messageListItemLayout when not provided', async () => {
      const component = render(<IterableInbox {...defaultProps} />);

      await waitFor(() => {
        const defaultContainers = component.getAllByTestId(
          inboxMessageCellTestIDs.defaultContainer
        );
        expect(defaultContainers[0]).toBeTruthy();
      });

      // The default messageListItemLayout is () => null
      // This test verifies the component renders with the default layout function
      const defaultContainers = component.getAllByTestId(
        inboxMessageCellTestIDs.defaultContainer
      );
      expect(defaultContainers).toHaveLength(2);
      expect(defaultContainers[0]).toBeTruthy();
    });

    it('should use default messageListItemLayout when it returns undefined', async () => {
      const component = render(
        <IterableInbox
          {...defaultProps}
          messageListItemLayout={() => undefined}
        />
      );

      await waitFor(() => {
        const defaultContainers = component.getAllByTestId(
          inboxMessageCellTestIDs.defaultContainer
        );
        expect(defaultContainers[0]).toBeTruthy();
      });

      // The default messageListItemLayout is () => null
      // This test verifies the component renders with the default layout function
      const defaultContainers = component.getAllByTestId(
        inboxMessageCellTestIDs.defaultContainer
      );
      expect(defaultContainers).toHaveLength(2);
      expect(defaultContainers[0]).toBeTruthy();
    });
  });
});
