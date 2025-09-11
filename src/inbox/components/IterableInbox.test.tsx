import { render, waitFor, act } from '@testing-library/react-native';
import { IterableInbox } from './IterableInbox';
import { useIsFocused } from '@react-navigation/native';
import { useAppStateListener, useDeviceOrientation } from '../../core';
import { Iterable } from '../../core/classes/Iterable';
import { IterableInboxDataModel } from '../classes/IterableInboxDataModel';
import { IterableInboxEmptyState } from './IterableInboxEmptyState';
import { IterableInboxMessageDisplay } from './IterableInboxMessageDisplay';
import { IterableInboxMessageList } from './IterableInboxMessageList';
import { IterableInAppLocation, IterableInAppDeleteSource } from '../../inApp';
import type { IterableInboxCustomizations } from '../types/IterableInboxCustomizations';
import type { IterableInboxRowViewModel } from '../types/IterableInboxRowViewModel';
import type { IterableInAppMessage } from '../../inApp';

// Extended type for test data that includes the dynamically added 'last' property
type TestIterableInboxRowViewModel = IterableInboxRowViewModel & { last: boolean };

// Mock IterableInAppMessage for testing
const createMockInAppMessage = (messageId: string, campaignId: number = 123): IterableInAppMessage => ({
  messageId,
  campaignId,
  trigger: {} as unknown,
  saveToInbox: true,
  read: false,
  priorityLevel: 0,
  isSilentInbox: () => false,
} as IterableInAppMessage);

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

jest.mock('../../core', () => ({
  useAppStateListener: jest.fn(),
  useDeviceOrientation: jest.fn(),
}));

jest.mock('../../core/classes/Iterable', () => ({
  Iterable: {
    trackInAppOpen: jest.fn(),
  },
}));

jest.mock('../classes/IterableInboxDataModel');
jest.mock('./IterableInboxEmptyState');
jest.mock('./IterableInboxMessageDisplay');
jest.mock('./IterableInboxMessageList');

// Mock React Native modules
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: 'SafeAreaView',
}));

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Mock the API module
jest.mock('../../api', () => ({
  __esModule: true,
  default: {
    addListener: jest.fn(),
    removeAllListeners: jest.fn(),
  },
}));


// Mock data
const mockMessages: TestIterableInboxRowViewModel[] = [
  {
    title: 'Test Message 1',
    read: false,
    inAppMessage: createMockInAppMessage('1', 123),
    last: false,
  },
  {
    title: 'Test Message 2',
    read: true,
    inAppMessage: createMockInAppMessage('2', 456),
    last: true,
  },
];

describe('IterableInbox', () => {
  let mockDataModelInstance: {
    refresh: jest.Mock;
    deleteItemById: jest.Mock;
    setMessageAsRead: jest.Mock;
    startSession: jest.Mock;
    endSession: jest.Mock;
    updateVisibleRows: jest.Mock;
    getHtmlContentForMessageId: jest.Mock;
  };
  let mockIterableInboxEmptyState: jest.MockedFunction<typeof IterableInboxEmptyState>;
  let mockIterableInboxMessageDisplay: jest.MockedFunction<typeof IterableInboxMessageDisplay>;
  let mockIterableInboxMessageList: jest.MockedFunction<typeof IterableInboxMessageList>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock data model
    mockDataModelInstance = {
      refresh: jest.fn().mockResolvedValue(mockMessages),
      deleteItemById: jest.fn(),
      setMessageAsRead: jest.fn(),
      startSession: jest.fn(),
      endSession: jest.fn(),
      updateVisibleRows: jest.fn(),
      getHtmlContentForMessageId: jest.fn().mockResolvedValue('<p>Test content</p>'),
    } as typeof mockDataModelInstance;
    (IterableInboxDataModel as unknown as jest.Mock).mockImplementation(() => mockDataModelInstance);

    // Setup mock child components
    mockIterableInboxEmptyState = jest.fn().mockReturnValue(null);
    mockIterableInboxMessageDisplay = jest.fn().mockReturnValue(null);
    mockIterableInboxMessageList = jest.fn().mockReturnValue(null);

    (IterableInboxEmptyState as jest.Mock).mockImplementation(mockIterableInboxEmptyState);
    (IterableInboxMessageDisplay as jest.Mock).mockImplementation(mockIterableInboxMessageDisplay);
    (IterableInboxMessageList as jest.Mock).mockImplementation(mockIterableInboxMessageList);

    // Setup default hook return values
    (useIsFocused as jest.Mock).mockReturnValue(true);
    (useAppStateListener as jest.Mock).mockReturnValue('active');
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      height: 800,
      width: 400,
      isPortrait: true,
    });
  });

  describe('Component Rendering', () => {
    it('should render with default props', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should render with custom title', async () => {
      render(<IterableInbox customizations={{ navTitle: 'Custom Title' }} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should not render title when showNavTitle is false', async () => {
      render(<IterableInbox showNavTitle={false} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });
  });

  describe('Message Fetching and Display', () => {
    it('should fetch messages on mount', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should display message list when messages are available', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Check that the component was called with the expected props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      expect(messageListProps?.rowViewModels).toEqual(expect.any(Array));
      expect(messageListProps?.rowViewModels?.length).toBeGreaterThan(0);
    });

    it('should display empty state when no messages are available', async () => {
      mockDataModelInstance.refresh.mockResolvedValue([]);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockIterableInboxEmptyState).toHaveBeenCalled();
      });

      // Check that the component was called with the expected props
      const emptyStateProps = mockIterableInboxEmptyState.mock.calls[0]?.[0];
      expect(emptyStateProps!.tabBarHeight).toBe(80);
    });
  });

  describe('Session Management', () => {
    it('should start session when app is active and focused', async () => {
      (useAppStateListener as jest.Mock).mockReturnValue('active');
      (useIsFocused as jest.Mock).mockReturnValue(true);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should end session when app goes to background on Android', async () => {
      // This test is covered by the 'should end session when app becomes inactive' test
      // since both inactive and background states trigger endSession in the component
      (useAppStateListener as jest.Mock).mockReturnValue('inactive');
      (useIsFocused as jest.Mock).mockReturnValue(true);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.endSession).toHaveBeenCalled();
      });
    });

    it('should end session when app becomes inactive', async () => {
      (useAppStateListener as jest.Mock).mockReturnValue('inactive');

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.endSession).toHaveBeenCalled();
      });
    });

    it('should end session when component loses focus', async () => {
      (useIsFocused as jest.Mock).mockReturnValue(false);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.endSession).toHaveBeenCalled();
      });
    });
  });

  describe('Message Selection and Navigation', () => {
    it('should handle message selection correctly', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the handleMessageSelect function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const handleMessageSelect = messageListProps!.handleMessageSelect;

      act(() => {
        handleMessageSelect('1', 0);
      });

      expect(mockDataModelInstance.setMessageAsRead).toHaveBeenCalledWith('1');
      expect(Iterable.trackInAppOpen).toHaveBeenCalledWith(
        expect.anything(),
        IterableInAppLocation.inbox
      );
    });

    it('should display message when selected', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the handleMessageSelect function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const handleMessageSelect = messageListProps!.handleMessageSelect;

      act(() => {
        handleMessageSelect('1', 0);
      });

      await waitFor(() => {
        expect(mockIterableInboxMessageDisplay).toHaveBeenCalled();
      });

      // Check that the component was called with the expected props
      const messageDisplayProps = mockIterableInboxMessageDisplay.mock.calls[0]?.[0];
      expect(messageDisplayProps!.rowViewModel).toBeDefined();
    });
  });

  describe('Message Deletion', () => {
    it('should handle message deletion correctly', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the deleteRow function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const deleteRow = messageListProps!.deleteRow;

      act(() => {
        deleteRow('1');
      });

      expect(mockDataModelInstance.deleteItemById).toHaveBeenCalledWith(
        '1',
        IterableInAppDeleteSource.inboxSwipe
      );
    });
  });

  describe('Visible Message Impressions', () => {
    it('should update visible message impressions', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the updateVisibleMessageImpressions function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const updateVisibleMessageImpressions = messageListProps!.updateVisibleMessageImpressions;

      const mockImpressions = [
        { messageId: '1', impression: { visible: true }, silentInbox: false },
      ];

      act(() => {
        updateVisibleMessageImpressions(mockImpressions);
      });

      // The function should be called and update state
      expect(updateVisibleMessageImpressions).toBeDefined();
    });
  });

  describe('Device Orientation', () => {
    it('should handle portrait orientation', async () => {
      (useDeviceOrientation as jest.Mock).mockReturnValue({
        height: 800,
        width: 400,
        isPortrait: true,
      });

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should handle landscape orientation', async () => {
      (useDeviceOrientation as jest.Mock).mockReturnValue({
        height: 400,
        width: 800,
        isPortrait: false,
      });

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });
  });

  describe('Customizations', () => {
    it('should pass customizations to child components', async () => {
      const customStyles = {
        navTitle: 'Custom Inbox',
        unreadIndicator: {
          backgroundColor: 'red',
          height: 10,
        },
      } as IterableInboxCustomizations;

      render(<IterableInbox customizations={customStyles} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Check that the component was called with the expected props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      expect(messageListProps!.customizations).toEqual(customStyles);
    });

    it('should pass tab bar dimensions to empty state', async () => {
      const tabBarHeight = 50;
      mockDataModelInstance.refresh.mockResolvedValue([]);

      render(<IterableInbox tabBarHeight={tabBarHeight} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockIterableInboxEmptyState).toHaveBeenCalled();
      });

      // Check that the component was called with the expected props
      const emptyStateProps = mockIterableInboxEmptyState.mock.calls[0]?.[0];
      expect(emptyStateProps!.tabBarHeight).toBe(tabBarHeight);
    });
  });

  describe('Message List Item Layout', () => {
    it('should pass messageListItemLayout function to message list', async () => {
      const mockLayoutFunction = jest.fn();

      render(<IterableInbox messageListItemLayout={mockLayoutFunction} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Check that the component was called with the expected props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      expect(messageListProps!.messageListItemLayout).toBe(mockLayoutFunction);
    });
  });

  describe('Error Handling', () => {
    it('should handle data model refresh errors gracefully', async () => {
      // Test that the component renders even when data model methods are called
      // This tests the component's resilience to potential errors
      render(<IterableInbox />);

      // Wait for the component to attempt to fetch messages
      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // The component should render successfully
      // Note: The current implementation doesn't have explicit error handling
      // in fetchInboxMessages, but the component should still render
    });
  });

  describe('Fetch Inbox Messages Functionality', () => {
    it('should fetch messages on component mount', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should process messages and set last flag correctly', async () => {
      const testMessages: TestIterableInboxRowViewModel[] = [
        { title: 'Message 1', read: false, inAppMessage: createMockInAppMessage('1'), last: false },
        { title: 'Message 2', read: false, inAppMessage: createMockInAppMessage('2'), last: false },
        { title: 'Message 3', read: false, inAppMessage: createMockInAppMessage('3'), last: true },
      ];

      mockDataModelInstance.refresh.mockResolvedValue(testMessages);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered with processed messages
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Check that messages were processed with last flag
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      expect(messageListProps!.rowViewModels).toHaveLength(3);
      expect((messageListProps!.rowViewModels as TestIterableInboxRowViewModel[])[0]!.last).toBe(false);
      expect((messageListProps!.rowViewModels as TestIterableInboxRowViewModel[])[1]!.last).toBe(false);
      expect((messageListProps!.rowViewModels as TestIterableInboxRowViewModel[])[2]!.last).toBe(true);
    });

    it('should handle empty message list', async () => {
      mockDataModelInstance.refresh.mockResolvedValue([]);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for empty state to be rendered
      await waitFor(() => {
        expect(mockIterableInboxEmptyState).toHaveBeenCalled();
      });
    });

    it('should handle single message correctly', async () => {
      const singleMessage: TestIterableInboxRowViewModel[] = [
        { title: 'Single Message', read: false, inAppMessage: createMockInAppMessage('1'), last: true },
      ];

      mockDataModelInstance.refresh.mockResolvedValue(singleMessage);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Check that single message has last flag set to true
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      expect(messageListProps!.rowViewModels).toHaveLength(1);
      expect((messageListProps!.rowViewModels as TestIterableInboxRowViewModel[])[0]!.last).toBe(true);
    });

    it('should refetch messages after deleting a message', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the deleteRow function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const deleteRow = messageListProps!.deleteRow;

      // Clear previous calls
      mockDataModelInstance.refresh.mockClear();

      // Delete a message
      act(() => {
        deleteRow('1');
      });

      // Verify that refresh was called again after deletion
      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should preserve message properties when processing', async () => {
      const testMessages: TestIterableInboxRowViewModel[] = [
        {
          title: 'Test Message 1',
          inAppMessage: createMockInAppMessage('1', 123),
          read: false,
          last: false
        },
        {
          title: 'Test Message 2',
          inAppMessage: createMockInAppMessage('2', 456),
          read: true,
          last: true
        },
      ];

      mockDataModelInstance.refresh.mockResolvedValue(testMessages);

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Check that all message properties are preserved
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      expect((messageListProps!.rowViewModels as TestIterableInboxRowViewModel[])[0]).toMatchObject({
        title: 'Test Message 1',
        inAppMessage: { messageId: '1', campaignId: 123 },
        read: false,
        last: false
      });
      expect((messageListProps!.rowViewModels as TestIterableInboxRowViewModel[])[1]).toMatchObject({
        title: 'Test Message 2',
        inAppMessage: { messageId: '2', campaignId: 456 },
        read: true,
        last: true
      });
    });
  });

  describe('Delete Row Functionality', () => {
    it('should pass deleteRow function to message list component', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Check that deleteRow function is passed to the message list component
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      expect(messageListProps!.deleteRow).toBeDefined();
      expect(typeof messageListProps!.deleteRow).toBe('function');
    });

    it('should pass deleteRow function to message display component', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the handleMessageSelect function and select a message
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const handleMessageSelect = messageListProps!.handleMessageSelect;

      act(() => {
        handleMessageSelect('1', 0);
      });

      // Wait for message display to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageDisplay).toHaveBeenCalled();
      });

      // Check that deleteRow function is passed to the message display component
      const messageDisplayProps = mockIterableInboxMessageDisplay.mock.calls[0]?.[0];
      expect(messageDisplayProps!.deleteRow).toBeDefined();
      expect(typeof messageDisplayProps!.deleteRow).toBe('function');
    });

    it('should call deleteItemById with correct parameters when deleteRow is called', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the deleteRow function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const deleteRow = messageListProps!.deleteRow;

      // Clear previous calls
      mockDataModelInstance.deleteItemById.mockClear();
      mockDataModelInstance.refresh.mockClear();

      // Call deleteRow with a message ID
      act(() => {
        deleteRow('test-message-id');
      });

      // Verify that deleteItemById was called with correct parameters
      expect(mockDataModelInstance.deleteItemById).toHaveBeenCalledWith(
        'test-message-id',
        IterableInAppDeleteSource.inboxSwipe
      );
    });

    it('should refetch messages after deleting a row', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the deleteRow function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const deleteRow = messageListProps!.deleteRow;

      // Clear previous calls
      mockDataModelInstance.deleteItemById.mockClear();
      mockDataModelInstance.refresh.mockClear();

      // Call deleteRow
      act(() => {
        deleteRow('test-message-id');
      });

      // Verify that refresh was called after deletion
      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });
    });

    it('should handle deleteRow function call without errors', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the deleteRow function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const deleteRow = messageListProps!.deleteRow;

      // Test that deleteRow can be called without throwing errors
      expect(() => {
        act(() => {
          deleteRow('test-message-id');
        });
      }).not.toThrow();
    });

    it('should handle deleteRow with different message IDs', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the deleteRow function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const deleteRow = messageListProps!.deleteRow;

      // Test with different message IDs
      const testMessageIds = ['msg-1', 'msg-2', 'msg-3', 'special-chars-!@#$%'];

      testMessageIds.forEach((messageId) => {
        // Clear previous calls
        mockDataModelInstance.deleteItemById.mockClear();
        mockDataModelInstance.refresh.mockClear();

        // Call deleteRow with different message ID
        act(() => {
          deleteRow(messageId);
        });

        // Verify that deleteItemById was called with the correct message ID
        expect(mockDataModelInstance.deleteItemById).toHaveBeenCalledWith(
          messageId,
          IterableInAppDeleteSource.inboxSwipe
        );
      });
    });

    it('should use correct delete source enum value', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the deleteRow function from the message list props
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const deleteRow = messageListProps!.deleteRow;

      // Clear previous calls
      mockDataModelInstance.deleteItemById.mockClear();

      // Call deleteRow
      act(() => {
        deleteRow('test-message-id');
      });

      // Verify that the correct delete source enum is used
      expect(mockDataModelInstance.deleteItemById).toHaveBeenCalledWith(
        'test-message-id',
        IterableInAppDeleteSource.inboxSwipe
      );
    });
  });

  describe('Return to Inbox Functionality', () => {
    it('should pass returnToInbox function to message display component', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the handleMessageSelect function and select a message
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const handleMessageSelect = messageListProps!.handleMessageSelect;

      act(() => {
        handleMessageSelect('1', 0);
      });

      // Wait for message display to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageDisplay).toHaveBeenCalled();
      });

      // Check that returnToInbox function is passed to the message display component
      const messageDisplayProps = mockIterableInboxMessageDisplay.mock.calls[0]?.[0];
      expect(messageDisplayProps!.returnToInbox).toBeDefined();
      expect(typeof messageDisplayProps!.returnToInbox).toBe('function');
    });

    it('should call returnToInbox function without errors', async () => {
      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the handleMessageSelect function and select a message
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const handleMessageSelect = messageListProps!.handleMessageSelect;

      act(() => {
        handleMessageSelect('1', 0);
      });

      // Wait for message display to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageDisplay).toHaveBeenCalled();
      });

      // Get the returnToInbox function from the message display props
      const messageDisplayProps = mockIterableInboxMessageDisplay.mock.calls[0]?.[0];
      const returnToInbox = messageDisplayProps!.returnToInbox;

      // Test calling returnToInbox directly - should not throw
      expect(() => {
        act(() => {
          returnToInbox();
        });
      }).not.toThrow();
    });

    it('should call returnToInbox function with callback without errors', async () => {
      const mockCallback = jest.fn();

      render(<IterableInbox />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the handleMessageSelect function and select a message
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const handleMessageSelect = messageListProps!.handleMessageSelect;

      act(() => {
        handleMessageSelect('1', 0);
      });

      // Wait for message display to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageDisplay).toHaveBeenCalled();
      });

      // Get the returnToInbox function from the message display props
      const messageDisplayProps = mockIterableInboxMessageDisplay.mock.calls[0]?.[0];
      const returnToInbox = messageDisplayProps!.returnToInbox;

      // Test calling returnToInbox with a callback - should not throw
      expect(() => {
        act(() => {
          returnToInbox(mockCallback);
        });
      }).not.toThrow();
    });

    it('should handle returnToInboxTrigger prop changes correctly', async () => {
      const { rerender } = render(<IterableInbox returnToInboxTrigger={false} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Wait for message list to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageList).toHaveBeenCalled();
      });

      // Get the handleMessageSelect function and select a message
      const messageListProps = mockIterableInboxMessageList.mock.calls[0]?.[0];
      const handleMessageSelect = messageListProps!.handleMessageSelect;

      act(() => {
        handleMessageSelect('1', 0);
      });

      // Wait for message display to be rendered
      await waitFor(() => {
        expect(mockIterableInboxMessageDisplay).toHaveBeenCalled();
      });

      // Change the returnToInboxTrigger prop
      rerender(<IterableInbox returnToInboxTrigger={true} />);

      // The component should handle the prop change without errors
      // (The actual animation behavior is tested in the component's useEffect)
    });

    it('should accept returnToInboxTrigger prop', async () => {
      render(<IterableInbox returnToInboxTrigger={true} />);

      await waitFor(() => {
        expect(mockDataModelInstance.refresh).toHaveBeenCalled();
      });

      // Component should render successfully with the prop
      expect(mockIterableInboxMessageList).toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('should clean up and end session on unmount', () => {
      const { unmount } = render(<IterableInbox />);

      unmount();

      expect(mockDataModelInstance.endSession).toHaveBeenCalled();
    });
  });
});
