import { renderHook, act } from '@testing-library/react-native';

import { Iterable } from '../../../core/classes/Iterable';
import { IterableAction } from '../../../core/classes/IterableAction';
import { IterableEmbeddedViewType } from '../../enums';
import type { IterableEmbeddedMessage } from '../../types/IterableEmbeddedMessage';
import type { IterableEmbeddedMessageElementsButton } from '../../types/IterableEmbeddedMessageElementsButton';
import { useEmbeddedView } from './useEmbeddedView';
import { getMedia } from './getMedia';
import { getStyles } from './getStyles';

jest.mock('./getMedia');
jest.mock('./getStyles');

const mockGetMedia = getMedia as jest.MockedFunction<typeof getMedia>;
const mockGetStyles = getStyles as jest.MockedFunction<typeof getStyles>;

const minimalMessage: IterableEmbeddedMessage = {
  metadata: { messageId: 'msg-1', placementId: 1 },
};

const defaultMedia = { url: null, caption: null, shouldShow: false };
const defaultStyles = {
  backgroundColor: '#ffffff',
  borderColor: '#E0DEDF',
  borderWidth: 1,
  borderCornerRadius: 10,
  primaryBtnBackgroundColor: '#6A266D',
  primaryBtnTextColor: '#ffffff',
  secondaryBtnBackgroundColor: 'transparent',
  secondaryBtnTextColor: '#ffffff',
  titleTextColor: '#000000',
  bodyTextColor: '#000000',
};

describe('useEmbeddedView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetMedia.mockReturnValue(defaultMedia);
    mockGetStyles.mockReturnValue(defaultStyles);
    jest.spyOn(Iterable.embeddedManager, 'handleClick').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('return shape', () => {
    it('returns handleButtonClick, handleMessageClick, media, and parsedStyles', () => {
      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, { message: minimalMessage })
      );

      expect(result.current).toHaveProperty('handleButtonClick');
      expect(result.current).toHaveProperty('handleMessageClick');
      expect(result.current).toHaveProperty('media');
      expect(result.current).toHaveProperty('parsedStyles');
      expect(typeof result.current.handleButtonClick).toBe('function');
      expect(typeof result.current.handleMessageClick).toBe('function');
    });
  });

  describe('getMedia / getStyles delegation', () => {
    it('calls getMedia with viewType and message', () => {
      renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Card, { message: minimalMessage })
      );

      expect(mockGetMedia).toHaveBeenCalledWith(IterableEmbeddedViewType.Card, minimalMessage);
    });

    it('calls getStyles with viewType and config', () => {
      const config = { backgroundColor: '#000000' };
      renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, {
          message: minimalMessage,
          config,
        })
      );

      expect(mockGetStyles).toHaveBeenCalledWith(IterableEmbeddedViewType.Notification, config);
    });

    it('returns media from getMedia and parsedStyles from getStyles', () => {
      const customMedia = { url: 'https://example.com/img.png', caption: 'Cap', shouldShow: true };
      const customStyles = { ...defaultStyles, backgroundColor: '#111111' };
      mockGetMedia.mockReturnValue(customMedia);
      mockGetStyles.mockReturnValue(customStyles);

      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Banner, { message: minimalMessage })
      );

      expect(result.current.media).toEqual(customMedia);
      expect(result.current.parsedStyles).toEqual(customStyles);
    });
  });

  describe('handleButtonClick', () => {
    it('calls onButtonClick with the button', () => {
      const onButtonClick = jest.fn();
      const button: IterableEmbeddedMessageElementsButton = {
        id: 'btn-1',
        title: 'Click me',
        action: null,
      };

      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, {
          message: minimalMessage,
          onButtonClick,
        })
      );

      act(() => {
        result.current.handleButtonClick(button);
      });

      expect(onButtonClick).toHaveBeenCalledTimes(1);
      expect(onButtonClick).toHaveBeenCalledWith(button);
    });

    it('calls Iterable.embeddedManager.handleClick with message, button.id, and button.action', () => {
      const action = new IterableAction('openUrl', 'https://example.com');
      const button: IterableEmbeddedMessageElementsButton = {
        id: 'btn-2',
        title: 'Link',
        action,
      };

      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, {
          message: minimalMessage,
        })
      );

      act(() => {
        result.current.handleButtonClick(button);
      });

      expect(Iterable.embeddedManager.handleClick).toHaveBeenCalledWith(
        minimalMessage,
        'btn-2',
        action
      );
    });
  });

  describe('handleMessageClick', () => {
    it('calls onMessageClick', () => {
      const onMessageClick = jest.fn();

      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, {
          message: minimalMessage,
          onMessageClick,
        })
      );

      act(() => {
        result.current.handleMessageClick();
      });

      expect(onMessageClick).toHaveBeenCalledTimes(1);
    });

    it('calls Iterable.embeddedManager.handleClick with message, null, and message.elements?.defaultAction', () => {
      const defaultAction = new IterableAction('openUrl', 'https://iterable.com');
      const message: IterableEmbeddedMessage = {
        ...minimalMessage,
        elements: { defaultAction },
      };

      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, { message })
      );

      act(() => {
        result.current.handleMessageClick();
      });

      expect(Iterable.embeddedManager.handleClick).toHaveBeenCalledWith(
        message,
        null,
        defaultAction
      );
    });

    it('calls embeddedManager.handleClick with undefined defaultAction when message has no elements', () => {
      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, { message: minimalMessage })
      );

      act(() => {
        result.current.handleMessageClick();
      });

      expect(Iterable.embeddedManager.handleClick).toHaveBeenCalledWith(
        minimalMessage,
        null,
        undefined
      );
    });
  });

  describe('default callbacks', () => {
    it('does not throw when handleButtonClick is invoked without provided onButtonClick', () => {
      const button: IterableEmbeddedMessageElementsButton = { id: 'b', title: null, action: null };
      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, { message: minimalMessage })
      );

      expect(() => {
        act(() => {
          result.current.handleButtonClick(button);
        });
      }).not.toThrow();
    });

    it('does not throw when handleMessageClick is invoked without provided onMessageClick', () => {
      const { result } = renderHook(() =>
        useEmbeddedView(IterableEmbeddedViewType.Notification, { message: minimalMessage })
      );

      expect(() => {
        act(() => {
          result.current.handleMessageClick();
        });
      }).not.toThrow();
    });
  });

  // memoization behavior (useMemo) is indirectly exercised above via getMedia/getStyles calls
});
