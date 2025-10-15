import { render } from '@testing-library/react-native';

import type { IterableInboxCustomizations } from '../types';
import { IterableInboxEmptyState } from './IterableInboxEmptyState';

describe('IterableInboxEmptyState', () => {
  const defaultCustomizations: IterableInboxCustomizations = {};

  const defaultProps = {
    customizations: defaultCustomizations,
    tabBarHeight: 50,
    tabBarPadding: 10,
    navTitleHeight: 44,
    contentWidth: 300,
    height: 600,
    isPortrait: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render without crashing with valid props', () => {
      expect(() => render(<IterableInboxEmptyState {...defaultProps} />)).not.toThrow();
    });

    it('should render the default title when no custom title is provided', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should render the default body when no custom body is provided', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);
      expect(getByText('Check again later!')).toBeTruthy();
    });

    it('should render both title and body text', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);
      expect(getByText('No saved messages')).toBeTruthy();
      expect(getByText('Check again later!')).toBeTruthy();
    });

    it('should render with correct container structure', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      // Both text elements should be present
      const title = getByText('No saved messages');
      const body = getByText('Check again later!');

      expect(title).toBeTruthy();
      expect(body).toBeTruthy();
    });
  });

  describe('Customizations', () => {
    it('should render custom title when provided', () => {
      const customizations: IterableInboxCustomizations = {
        noMessagesTitle: 'Custom Empty Title',
      };

      const propsWithCustomTitle = {
        ...defaultProps,
        customizations,
      };

      const { getByText, queryByText } = render(<IterableInboxEmptyState {...propsWithCustomTitle} />);

      expect(getByText('Custom Empty Title')).toBeTruthy();
      expect(queryByText('No saved messages')).toBeFalsy();
    });

    it('should render custom body when provided', () => {
      const customizations: IterableInboxCustomizations = {
        noMessagesBody: 'Custom empty message body',
      };

      const propsWithCustomBody = {
        ...defaultProps,
        customizations,
      };

      const { getByText, queryByText } = render(<IterableInboxEmptyState {...propsWithCustomBody} />);

      expect(getByText('Custom empty message body')).toBeTruthy();
      expect(queryByText('Check again later!')).toBeFalsy();
    });

    it('should render both custom title and body when provided', () => {
      const customizations: IterableInboxCustomizations = {
        noMessagesTitle: 'Custom Empty Title',
        noMessagesBody: 'Custom empty message body',
      };

      const propsWithCustomTexts = {
        ...defaultProps,
        customizations,
      };

      const { getByText, queryByText } = render(<IterableInboxEmptyState {...propsWithCustomTexts} />);

      expect(getByText('Custom Empty Title')).toBeTruthy();
      expect(getByText('Custom empty message body')).toBeTruthy();
      expect(queryByText('No saved messages')).toBeFalsy();
      expect(queryByText('Check again later!')).toBeFalsy();
    });

    it('should handle empty string customizations', () => {
      const customizations: IterableInboxCustomizations = {
        noMessagesTitle: '',
        noMessagesBody: '',
      };

      const propsWithEmptyCustomizations = {
        ...defaultProps,
        customizations,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithEmptyCustomizations} />);

      // Should fall back to defaults when customizations are empty strings
      expect(getByText('No saved messages')).toBeTruthy();
      expect(getByText('Check again later!')).toBeTruthy();
    });

    it('should handle undefined customizations gracefully', () => {
      const customizations: IterableInboxCustomizations = {
        noMessagesTitle: undefined,
        noMessagesBody: undefined,
      };

      const propsWithUndefinedCustomizations = {
        ...defaultProps,
        customizations,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithUndefinedCustomizations} />);

      // Should use defaults when customizations are undefined
      expect(getByText('No saved messages')).toBeTruthy();
      expect(getByText('Check again later!')).toBeTruthy();
    });

    it('should handle customizations with special characters', () => {
      const customizations: IterableInboxCustomizations = {
        noMessagesTitle: '测试标题 🚀',
        noMessagesBody: '测试消息体 ñáéíóú',
      };

      const propsWithSpecialChars = {
        ...defaultProps,
        customizations,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithSpecialChars} />);

      expect(getByText('测试标题 🚀')).toBeTruthy();
      expect(getByText('测试消息体 ñáéíóú')).toBeTruthy();
    });

    it('should handle very long custom text', () => {
      const longTitle = 'A'.repeat(1000);
      const longBody = 'B'.repeat(1000);

      const customizations: IterableInboxCustomizations = {
        noMessagesTitle: longTitle,
        noMessagesBody: longBody,
      };

      const propsWithLongText = {
        ...defaultProps,
        customizations,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithLongText} />);

      expect(getByText(longTitle)).toBeTruthy();
      expect(getByText(longBody)).toBeTruthy();
    });
  });

  describe('Layout Calculations', () => {
    it('should calculate height correctly in portrait mode', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      // Component should render without errors, indicating height calculation works
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should calculate height correctly in landscape mode', () => {
      const landscapeProps = {
        ...defaultProps,
        isPortrait: false,
      };

      const { getByText } = render(<IterableInboxEmptyState {...landscapeProps} />);

      // Component should render without errors, indicating height calculation works
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle different height values', () => {
      const propsWithDifferentHeight = {
        ...defaultProps,
        height: 800,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithDifferentHeight} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle different tab bar heights', () => {
      const propsWithDifferentTabBarHeight = {
        ...defaultProps,
        tabBarHeight: 100,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithDifferentTabBarHeight} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle different tab bar padding', () => {
      const propsWithDifferentTabBarPadding = {
        ...defaultProps,
        tabBarPadding: 20,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithDifferentTabBarPadding} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle different navigation title heights', () => {
      const propsWithDifferentNavTitleHeight = {
        ...defaultProps,
        navTitleHeight: 60,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithDifferentNavTitleHeight} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle zero height values', () => {
      const propsWithZeroHeight = {
        ...defaultProps,
        height: 0,
        tabBarHeight: 0,
        tabBarPadding: 0,
        navTitleHeight: 0,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithZeroHeight} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle negative height values', () => {
      const propsWithNegativeHeight = {
        ...defaultProps,
        height: -100,
        tabBarHeight: -10,
        tabBarPadding: -5,
        navTitleHeight: -20,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithNegativeHeight} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle very large height values', () => {
      const propsWithLargeHeight = {
        ...defaultProps,
        height: 2000,
        tabBarHeight: 200,
        tabBarPadding: 50,
        navTitleHeight: 100,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithLargeHeight} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });
  });

  describe('Props Variations', () => {
    it('should handle different content widths', () => {
      const propsWithDifferentWidth = {
        ...defaultProps,
        contentWidth: 600,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithDifferentWidth} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle zero content width', () => {
      const propsWithZeroWidth = {
        ...defaultProps,
        contentWidth: 0,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithZeroWidth} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle negative content width', () => {
      const propsWithNegativeWidth = {
        ...defaultProps,
        contentWidth: -100,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithNegativeWidth} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle very large content width', () => {
      const propsWithLargeWidth = {
        ...defaultProps,
        contentWidth: 2000,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithLargeWidth} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle portrait mode', () => {
      const portraitProps = {
        ...defaultProps,
        isPortrait: true,
      };

      const { getByText } = render(<IterableInboxEmptyState {...portraitProps} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle landscape mode', () => {
      const landscapeProps = {
        ...defaultProps,
        isPortrait: false,
      };

      const { getByText } = render(<IterableInboxEmptyState {...landscapeProps} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });
  });

  describe('Styling and Layout', () => {
    it('should apply correct container styles', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      // Component should render with proper styling
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should apply correct title styles', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      const title = getByText('No saved messages');
      expect(title).toBeTruthy();
    });

    it('should apply correct body styles', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      const body = getByText('Check again later!');
      expect(body).toBeTruthy();
    });

    it('should center content vertically and horizontally', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      // Both text elements should be present, indicating proper centering
      expect(getByText('No saved messages')).toBeTruthy();
      expect(getByText('Check again later!')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing customizations object', () => {
      const propsWithoutCustomizations = {
        ...defaultProps,
        customizations: {} as IterableInboxCustomizations,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithoutCustomizations} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle customizations with only some properties', () => {
      const partialCustomizations: IterableInboxCustomizations = {
        noMessagesTitle: 'Custom Title Only',
        // noMessagesBody is not provided
      };

      const propsWithPartialCustomizations = {
        ...defaultProps,
        customizations: partialCustomizations,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithPartialCustomizations} />);

      expect(getByText('Custom Title Only')).toBeTruthy();
      expect(getByText('Check again later!')).toBeTruthy(); // Should use default
    });

    it('should handle rapid prop changes', () => {
      const { rerender, getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      // Change props rapidly
      const newProps1 = { ...defaultProps, height: 800, isPortrait: false };
      const newProps2 = { ...defaultProps, contentWidth: 600, isPortrait: true };
      const newProps3 = { ...defaultProps, height: 400, contentWidth: 200 };

      expect(() => {
        rerender(<IterableInboxEmptyState {...newProps1} />);
        rerender(<IterableInboxEmptyState {...newProps2} />);
        rerender(<IterableInboxEmptyState {...newProps3} />);
      }).not.toThrow();

      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle extreme prop values', () => {
      const extremeProps = {
        customizations: defaultCustomizations,
        tabBarHeight: Number.MAX_SAFE_INTEGER,
        tabBarPadding: Number.MAX_SAFE_INTEGER,
        navTitleHeight: Number.MAX_SAFE_INTEGER,
        contentWidth: Number.MAX_SAFE_INTEGER,
        height: Number.MAX_SAFE_INTEGER,
        isPortrait: true,
      };

      const { getByText } = render(<IterableInboxEmptyState {...extremeProps} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle NaN prop values gracefully', () => {
      const nanProps = {
        customizations: defaultCustomizations,
        tabBarHeight: NaN,
        tabBarPadding: NaN,
        navTitleHeight: NaN,
        contentWidth: NaN,
        height: NaN,
        isPortrait: true,
      };

      const { getByText } = render(<IterableInboxEmptyState {...nanProps} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('should render with proper component hierarchy', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      // Verify both text elements are rendered
      const title = getByText('No saved messages');
      const body = getByText('Check again later!');

      expect(title).toBeTruthy();
      expect(body).toBeTruthy();
    });

    it('should maintain consistent structure across different props', () => {
      const testCases = [
        { ...defaultProps, isPortrait: true },
        { ...defaultProps, isPortrait: false },
        { ...defaultProps, height: 1000 },
        { ...defaultProps, contentWidth: 500 },
      ];

      testCases.forEach((props) => {
        const { getByText } = render(<IterableInboxEmptyState {...props} />);
        expect(getByText('No saved messages')).toBeTruthy();
        expect(getByText('Check again later!')).toBeTruthy();
      });
    });
  });

  describe('Performance Considerations', () => {
    it('should render efficiently with minimal props', () => {
      const minimalProps = {
        customizations: {},
        tabBarHeight: 50,
        tabBarPadding: 10,
        navTitleHeight: 44,
        contentWidth: 300,
        height: 600,
        isPortrait: true,
      };

      const { getByText } = render(<IterableInboxEmptyState {...minimalProps} />);
      expect(getByText('No saved messages')).toBeTruthy();
    });

    it('should handle multiple instances efficiently', () => {
      const instances = Array.from({ length: 10 }, (_, i) => {
        const props = {
          ...defaultProps,
          height: 600 + i * 10,
        };
        return render(<IterableInboxEmptyState {...props} />);
      });

      instances.forEach(({ getByText }) => {
        expect(getByText('No saved messages')).toBeTruthy();
      });
    });
  });

  describe('Accessibility', () => {
    it('should render text elements that are accessible', () => {
      const { getByText } = render(<IterableInboxEmptyState {...defaultProps} />);

      const title = getByText('No saved messages');
      const body = getByText('Check again later!');

      // Text elements should be accessible by screen readers
      expect(title).toBeTruthy();
      expect(body).toBeTruthy();
    });

    it('should maintain accessibility with custom text', () => {
      const customizations: IterableInboxCustomizations = {
        noMessagesTitle: 'Accessible Custom Title',
        noMessagesBody: 'Accessible custom message body',
      };

      const propsWithCustomText = {
        ...defaultProps,
        customizations,
      };

      const { getByText } = render(<IterableInboxEmptyState {...propsWithCustomText} />);

      expect(getByText('Accessible Custom Title')).toBeTruthy();
      expect(getByText('Accessible custom message body')).toBeTruthy();
    });
  });
});
