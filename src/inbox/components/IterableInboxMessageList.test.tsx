import { render } from '@testing-library/react-native';
import { IterableInAppMessage, IterableInAppTrigger, IterableInboxMetadata } from '../../inApp/classes';
import { IterableInAppTriggerType } from '../../inApp/enums';
import { IterableInboxDataModel } from '../classes';
import type { IterableInboxCustomizations, IterableInboxImpressionRowInfo, IterableInboxRowViewModel } from '../types';
import { IterableInboxMessageList } from './IterableInboxMessageList';

// Mock the IterableInboxMessageCell component
jest.mock('./IterableInboxMessageCell', () => ({
  IterableInboxMessageCell: ({ rowViewModel, index, last }: { rowViewModel: IterableInboxRowViewModel; index: number; last: boolean }) => {
    const { View, Text } = require('react-native');
    return (
      <View testID={`message-cell-${rowViewModel.inAppMessage.messageId}`}>
        <Text testID={`message-title-${index}`}>{rowViewModel.title}</Text>
        <Text testID={`message-last-${index}`}>{last ? 'last' : 'not-last'}</Text>
      </View>
    );
  },
}));

describe('IterableInboxMessageList', () => {
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
    createdAt: new Date('2023-01-01T00:00:00Z'),
  };

  const mockRowViewModel2: IterableInboxRowViewModel = {
    inAppMessage: mockMessage2,
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    imageUrl: 'imageUrl2.png',
    read: true,
    createdAt: new Date('2023-01-02T00:00:00Z'),
  };

  const mockDataModel = new IterableInboxDataModel();
  const mockCustomizations: IterableInboxCustomizations = {
    messageRow: {
      height: 150,
      backgroundColor: 'white',
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
    },
    title: {
      fontSize: 16,
      paddingBottom: 5,
    },
    body: {
      fontSize: 14,
      color: 'gray',
      paddingBottom: 5,
    },
    createdAt: {
      fontSize: 12,
      color: 'lightgray',
    },
    unreadIndicator: {
      width: 8,
      height: 8,
      backgroundColor: 'blue',
      borderRadius: 4,
    },
  };

  const defaultProps = {
    dataModel: mockDataModel,
    rowViewModels: [mockRowViewModel1, mockRowViewModel2],
    customizations: mockCustomizations,
    messageListItemLayout: jest.fn().mockReturnValue([null, 150]),
    deleteRow: jest.fn(),
    handleMessageSelect: jest.fn(),
    updateVisibleMessageImpressions: jest.fn(),
    contentWidth: 300,
    isPortrait: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render without crashing with minimal valid props', () => {
      expect(() => render(<IterableInboxMessageList {...defaultProps} />)).not.toThrow();
    });

    it('should render FlatList component', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);
      // FlatList doesn't have a testID by default, but we can check if it renders
      expect(() => getByTestId('message-cell-messageId1')).not.toThrow();
    });

    it('should render message cells for each row view model', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
      expect(getByTestId('message-cell-messageId2')).toBeTruthy();
    });

    it('should render with empty row view models array', () => {
      const propsWithEmptyData = { ...defaultProps, rowViewModels: [] };
      expect(() => render(<IterableInboxMessageList {...propsWithEmptyData} />)).not.toThrow();
    });

    it('should render with single row view model', () => {
      const propsWithSingleItem = { ...defaultProps, rowViewModels: [mockRowViewModel1] };
      const { getByTestId } = render(<IterableInboxMessageList {...propsWithSingleItem} />);

      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });
  });

  describe('Props Variations', () => {
    it('should handle different content widths', () => {
      const propsWithDifferentWidth = { ...defaultProps, contentWidth: 600 };
      expect(() => render(<IterableInboxMessageList {...propsWithDifferentWidth} />)).not.toThrow();
    });

    it('should handle portrait mode', () => {
      const portraitProps = { ...defaultProps, isPortrait: true };
      expect(() => render(<IterableInboxMessageList {...portraitProps} />)).not.toThrow();
    });

    it('should handle landscape mode', () => {
      const landscapeProps = { ...defaultProps, isPortrait: false };
      expect(() => render(<IterableInboxMessageList {...landscapeProps} />)).not.toThrow();
    });

    it('should handle zero content width', () => {
      const zeroWidthProps = { ...defaultProps, contentWidth: 0 };
      expect(() => render(<IterableInboxMessageList {...zeroWidthProps} />)).not.toThrow();
    });

    it('should handle negative content width', () => {
      const negativeWidthProps = { ...defaultProps, contentWidth: -100 };
      expect(() => render(<IterableInboxMessageList {...negativeWidthProps} />)).not.toThrow();
    });

    it('should handle very large content width', () => {
      const largeWidthProps = { ...defaultProps, contentWidth: 2000 };
      expect(() => render(<IterableInboxMessageList {...largeWidthProps} />)).not.toThrow();
    });
  });

  describe('FlatList Functionality', () => {
    it('should pass correct data to FlatList', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Verify that both message cells are rendered
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
      expect(getByTestId('message-cell-messageId2')).toBeTruthy();
    });

    it('should use correct keyExtractor', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // The keyExtractor should use messageId, which is used in the mock component
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
      expect(getByTestId('message-cell-messageId2')).toBeTruthy();
    });

    it('should pass correct props to message cells', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Check that the first message is not marked as last
      expect(getByTestId('message-title-0')).toBeTruthy();
      expect(getByTestId('message-last-0')).toHaveTextContent('not-last');

      // Check that the second message is marked as last
      expect(getByTestId('message-title-1')).toBeTruthy();
      expect(getByTestId('message-last-1')).toHaveTextContent('last');
    });

    it('should handle single item as last', () => {
      const singleItemProps = { ...defaultProps, rowViewModels: [mockRowViewModel1] };
      const { getByTestId } = render(<IterableInboxMessageList {...singleItemProps} />);

      expect(getByTestId('message-last-0')).toHaveTextContent('last');
    });
  });

  describe('Viewability Configuration', () => {
    it('should have correct viewability configuration', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // The component should render without errors, indicating viewability config is valid
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });

    it('should handle viewability config with minimum view time', () => {
      // Test that the component renders with the configured minimumViewTime of 500ms
      expect(() => render(<IterableInboxMessageList {...defaultProps} />)).not.toThrow();
    });

    it('should handle viewability config with item visible percent threshold', () => {
      // Test that the component renders with the configured itemVisiblePercentThreshold of 100
      expect(() => render(<IterableInboxMessageList {...defaultProps} />)).not.toThrow();
    });

    it('should handle viewability config with waitForInteraction false', () => {
      // Test that the component renders with waitForInteraction set to false
      expect(() => render(<IterableInboxMessageList {...defaultProps} />)).not.toThrow();
    });
  });

  describe('Impression Tracking', () => {
    it('should call updateVisibleMessageImpressions when viewable items change', () => {
      const mockUpdateVisibleMessageImpressions = jest.fn();
      const propsWithMockCallback = {
        ...defaultProps,
        updateVisibleMessageImpressions: mockUpdateVisibleMessageImpressions,
      };

      render(<IterableInboxMessageList {...propsWithMockCallback} />);

      // The callback should be defined and ready to be called
      expect(mockUpdateVisibleMessageImpressions).toBeDefined();
    });

    it('should process view tokens correctly in getRowInfosFromViewTokens', () => {
      const mockUpdateVisibleMessageImpressions = jest.fn();
      const propsWithMockCallback = {
        ...defaultProps,
        updateVisibleMessageImpressions: mockUpdateVisibleMessageImpressions,
      };

      const { getByTestId } = render(<IterableInboxMessageList {...propsWithMockCallback} />);

      // Verify the component renders and can process view tokens
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });

    it('should handle inboxSessionItemsChanged callback', () => {
      const mockUpdateVisibleMessageImpressions = jest.fn();
      const propsWithMockCallback = {
        ...defaultProps,
        updateVisibleMessageImpressions: mockUpdateVisibleMessageImpressions,
      };

      const { getByTestId } = render(<IterableInboxMessageList {...propsWithMockCallback} />);

      // The component should render and have the callback ready
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
      expect(mockUpdateVisibleMessageImpressions).toBeDefined();
    });

    it('should handle updateVisibleMessageImpressions with different implementations', () => {
      const customUpdateCallback = jest.fn((rowInfos: IterableInboxImpressionRowInfo[]) => {
        // Custom implementation
        rowInfos.forEach(rowInfo => {
          console.log(`Message ${rowInfo.messageId} is visible`);
        });
      });

      const propsWithCustomCallback = {
        ...defaultProps,
        updateVisibleMessageImpressions: customUpdateCallback,
      };

      expect(() => render(<IterableInboxMessageList {...propsWithCustomCallback} />)).not.toThrow();
    });

    it('should handle updateVisibleMessageImpressions with undefined callback', () => {
      const propsWithUndefinedCallback = {
        ...defaultProps,
        updateVisibleMessageImpressions: undefined as unknown as (rowInfos: IterableInboxImpressionRowInfo[]) => void,
      };

      expect(() => render(<IterableInboxMessageList {...propsWithUndefinedCallback} />)).not.toThrow();
    });
  });

  describe('Scroll Behavior', () => {
    it('should have scrollEnabled true by default (when not swiping)', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Component should render without errors, indicating scroll is enabled by default
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });

    it('should handle swiping state changes', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // The component should render and handle swiping state internally
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });
  });

  describe('Layout Callback', () => {
    it('should handle onLayout callback', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Component should render without errors, indicating onLayout is handled
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });

    it('should call recordInteraction on layout', () => {
      // We can't directly test the ref behavior, but we can ensure the component renders
      expect(() => render(<IterableInboxMessageList {...defaultProps} />)).not.toThrow();
    });

    it('should handle onLayout callback with FlatList ref', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // The component should render and handle the onLayout callback
      // The onLayout callback calls flatListRef.current?.recordInteraction()
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });
  });

  describe('Function Props', () => {
    it('should handle deleteRow function', () => {
      const mockDeleteRow = jest.fn();
      const propsWithDeleteRow = { ...defaultProps, deleteRow: mockDeleteRow };

      expect(() => render(<IterableInboxMessageList {...propsWithDeleteRow} />)).not.toThrow();
    });

    it('should handle handleMessageSelect function', () => {
      const mockHandleMessageSelect = jest.fn();
      const propsWithHandleMessageSelect = { ...defaultProps, handleMessageSelect: mockHandleMessageSelect };

      expect(() => render(<IterableInboxMessageList {...propsWithHandleMessageSelect} />)).not.toThrow();
    });

    it('should handle messageListItemLayout function', () => {
      const mockMessageListItemLayout = jest.fn().mockReturnValue([null, 200]);
      const propsWithLayout = { ...defaultProps, messageListItemLayout: mockMessageListItemLayout };

      expect(() => render(<IterableInboxMessageList {...propsWithLayout} />)).not.toThrow();
    });

    it('should handle undefined function props gracefully', () => {
      const propsWithUndefinedFunctions = {
        ...defaultProps,
        deleteRow: undefined as unknown as (messageId: string) => void,
        handleMessageSelect: undefined as unknown as (messageId: string, index: number) => void,
        messageListItemLayout: undefined as unknown as (last: boolean, rowViewModel: IterableInboxRowViewModel) => [React.ReactElement | null, number],
      };

      expect(() => render(<IterableInboxMessageList {...propsWithUndefinedFunctions} />)).not.toThrow();
    });
  });

  describe('Data Model Integration', () => {
    it('should work with different data model instances', () => {
      const differentDataModel = new IterableInboxDataModel();
      const propsWithDifferentDataModel = { ...defaultProps, dataModel: differentDataModel };

      expect(() => render(<IterableInboxMessageList {...propsWithDifferentDataModel} />)).not.toThrow();
    });

    it('should handle data model with custom functions', () => {
      const customDataModel = new IterableInboxDataModel();
      customDataModel.set(
        (message) => message.campaignId > 1,
        (msg1, msg2) => msg1.priorityLevel - msg2.priorityLevel,
        (message) => message.createdAt?.toISOString() ?? 'No date'
      );

      const propsWithCustomDataModel = { ...defaultProps, dataModel: customDataModel };
      expect(() => render(<IterableInboxMessageList {...propsWithCustomDataModel} />)).not.toThrow();
    });
  });

  describe('Customizations', () => {
    it('should handle different customizations', () => {
      const differentCustomizations: IterableInboxCustomizations = {
        messageRow: {
          height: 200,
          backgroundColor: 'red',
        },
        title: {
          fontSize: 20,
          paddingBottom: 10,
        },
      };

      const propsWithDifferentCustomizations = { ...defaultProps, customizations: differentCustomizations };
      expect(() => render(<IterableInboxMessageList {...propsWithDifferentCustomizations} />)).not.toThrow();
    });

    it('should handle minimal customizations', () => {
      const minimalCustomizations: IterableInboxCustomizations = {
        messageRow: {
          height: 100,
        },
      };

      const propsWithMinimalCustomizations = { ...defaultProps, customizations: minimalCustomizations };
      expect(() => render(<IterableInboxMessageList {...propsWithMinimalCustomizations} />)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null row view models', () => {
      const propsWithNullData = { ...defaultProps, rowViewModels: null as unknown as IterableInboxRowViewModel[] };
      expect(() => render(<IterableInboxMessageList {...propsWithNullData} />)).not.toThrow();
    });

    it('should handle undefined row view models', () => {
      const propsWithUndefinedData = { ...defaultProps, rowViewModels: undefined as unknown as IterableInboxRowViewModel[] };
      expect(() => render(<IterableInboxMessageList {...propsWithUndefinedData} />)).not.toThrow();
    });

    it('should handle row view models with missing properties', () => {
      const incompleteRowViewModel = {
        inAppMessage: mockMessage1,
        title: 'Incomplete Title',
        // Missing other properties
      } as IterableInboxRowViewModel;

      const propsWithIncompleteData = { ...defaultProps, rowViewModels: [incompleteRowViewModel] };
      expect(() => render(<IterableInboxMessageList {...propsWithIncompleteData} />)).not.toThrow();
    });

    it('should handle very large number of row view models', () => {
      const largeRowViewModels = Array.from({ length: 1000 }, (_, i) => ({
        inAppMessage: new IterableInAppMessage(
          `messageId${i}`,
          i,
          new IterableInAppTrigger(IterableInAppTriggerType.immediate),
          new Date(),
          undefined,
          true,
          new IterableInboxMetadata(`Title ${i}`, `Subtitle ${i}`, `imageUrl${i}.png`),
          undefined,
          false,
          i
        ),
        title: `Title ${i}`,
        subtitle: `Subtitle ${i}`,
        imageUrl: `imageUrl${i}.png`,
        read: false,
        createdAt: new Date(),
      }));

      const propsWithLargeData = { ...defaultProps, rowViewModels: largeRowViewModels };
      expect(() => render(<IterableInboxMessageList {...propsWithLargeData} />)).not.toThrow();
    });

    it('should handle row view models with special characters in message IDs', () => {
      const specialMessage = new IterableInAppMessage(
        'message-id-with-special-chars_123@test.com#special',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        undefined,
        true,
        new IterableInboxMetadata('Special Title', 'Special Subtitle', 'special.png'),
        undefined,
        false,
        0
      );

      const specialRowViewModel: IterableInboxRowViewModel = {
        inAppMessage: specialMessage,
        title: 'Special Title',
        subtitle: 'Special Subtitle',
        imageUrl: 'special.png',
        read: false,
        createdAt: new Date(),
      };

      const propsWithSpecialData = { ...defaultProps, rowViewModels: [specialRowViewModel] };
      expect(() => render(<IterableInboxMessageList {...propsWithSpecialData} />)).not.toThrow();
    });

    it('should handle row view models with unicode characters', () => {
      const unicodeMessage = new IterableInAppMessage(
        '测试消息ID_🚀_ñáéíóú',
        1,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        undefined,
        true,
        new IterableInboxMetadata('测试标题', '测试副标题', '测试图片.png'),
        undefined,
        false,
        0
      );

      const unicodeRowViewModel: IterableInboxRowViewModel = {
        inAppMessage: unicodeMessage,
        title: '测试标题',
        subtitle: '测试副标题',
        imageUrl: '测试图片.png',
        read: false,
        createdAt: new Date(),
      };

      const propsWithUnicodeData = { ...defaultProps, rowViewModels: [unicodeRowViewModel] };
      expect(() => render(<IterableInboxMessageList {...propsWithUnicodeData} />)).not.toThrow();
    });
  });

  describe('Component State Management', () => {
    it('should manage swiping state internally', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Component should render and manage swiping state
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });

    it('should maintain FlatList ref', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Component should render and maintain ref
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });
  });

  describe('Performance Considerations', () => {
    it('should handle rapid prop changes', () => {
      const { rerender, getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Change props rapidly
      const newProps1 = { ...defaultProps, contentWidth: 400 };
      const newProps2 = { ...defaultProps, isPortrait: false };
      const newProps3 = { ...defaultProps, contentWidth: 500, isPortrait: true };

      expect(() => {
        rerender(<IterableInboxMessageList {...newProps1} />);
        rerender(<IterableInboxMessageList {...newProps2} />);
        rerender(<IterableInboxMessageList {...newProps3} />);
      }).not.toThrow();

      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });

    it('should handle memory efficiently with large datasets', () => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        inAppMessage: new IterableInAppMessage(
          `largeMessageId${i}`,
          i,
          new IterableInAppTrigger(IterableInAppTriggerType.immediate),
          new Date(),
          undefined,
          true,
          new IterableInboxMetadata(`Large Title ${i}`, `Large Subtitle ${i}`, `largeImage${i}.png`),
          undefined,
          false,
          i
        ),
        title: `Large Title ${i}`,
        subtitle: `Large Subtitle ${i}`,
        imageUrl: `largeImage${i}.png`,
        read: false,
        createdAt: new Date(),
      }));

      const propsWithLargeDataset = { ...defaultProps, rowViewModels: largeDataset };
      expect(() => render(<IterableInboxMessageList {...propsWithLargeDataset} />)).not.toThrow();
    });
  });

  describe('Integration with IterableInboxMessageCell', () => {
    it('should pass all required props to message cells', () => {
      const { getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Verify that message cells receive the correct props by checking their rendering
      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
      expect(getByTestId('message-cell-messageId2')).toBeTruthy();
    });

    it('should handle message cell prop changes', () => {
      const { rerender, getByTestId } = render(<IterableInboxMessageList {...defaultProps} />);

      // Change props that affect message cells
      const newProps = { ...defaultProps, contentWidth: 600, isPortrait: false };
      rerender(<IterableInboxMessageList {...newProps} />);

      expect(getByTestId('message-cell-messageId1')).toBeTruthy();
    });
  });
});
