/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from '@testing-library/react-native';

import { IterableEmbeddedViewType } from '../../enums/IterableEmbeddedViewType';
import { useEmbeddedView } from '../../hooks/useEmbeddedView';
import type { IterableEmbeddedMessage } from '../../types/IterableEmbeddedMessage';
import type { IterableEmbeddedMessageElementsButton } from '../../types/IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification';

const mockHandleButtonClick = jest.fn();
const mockHandleMessageClick = jest.fn();

jest.mock('../../hooks/useEmbeddedView', () => ({
  useEmbeddedView: jest.fn(),
}));

const mockUseEmbeddedView = useEmbeddedView as jest.MockedFunction<
  typeof useEmbeddedView
>;

const defaultParsedStyles = {
  backgroundColor: '#ffffff',
  borderColor: '#E0DEDF',
  borderCornerRadius: 8,
  borderWidth: 1,
  primaryBtnBackgroundColor: '#6A266D',
  primaryBtnTextColor: '#ffffff',
  secondaryBtnBackgroundColor: 'transparent',
  secondaryBtnTextColor: '#79347F',
  titleTextColor: '#3D3A3B',
  bodyTextColor: '#787174',
};

function mockUseEmbeddedViewReturn(overrides: Partial<ReturnType<typeof useEmbeddedView>> = {}) {
  mockUseEmbeddedView.mockReturnValue({
    parsedStyles: defaultParsedStyles,
    handleButtonClick: mockHandleButtonClick,
    handleMessageClick: mockHandleMessageClick,
    media: { url: null, caption: null, shouldShow: false },
    ...overrides,
  });
}

describe('IterableEmbeddedNotification', () => {
  const baseMessage: IterableEmbeddedMessage = {
    metadata: {
      messageId: 'msg-1',
      campaignId: 1,
      placementId: 1,
    },
    elements: {
      title: 'Notification Title',
      body: 'Notification body text.',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseEmbeddedViewReturn();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { getByText } = render(
        <IterableEmbeddedNotification message={baseMessage} />
      );
      expect(getByText('Notification Title')).toBeTruthy();
      expect(getByText('Notification body text.')).toBeTruthy();
    });

    it('should render title and body from message.elements', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: {
          title: 'Custom Title',
          body: 'Custom body content.',
        },
      };
      const { getByText } = render(
        <IterableEmbeddedNotification message={message} />
      );
      expect(getByText('Custom Title')).toBeTruthy();
      expect(getByText('Custom body content.')).toBeTruthy();
    });

    it('should apply parsedStyles to container and text', () => {
      const customStyles = {
        ...defaultParsedStyles,
        backgroundColor: '#000000',
        titleTextColor: '#ff0000',
        bodyTextColor: '#00ff00',
      };
      mockUseEmbeddedViewReturn({ parsedStyles: customStyles });

      const { getByText, UNSAFE_getAllByType } = render(
        <IterableEmbeddedNotification message={baseMessage} />
      );

      const views = UNSAFE_getAllByType('View' as any);
      const styleArray = (s: any) => (Array.isArray(s) ? s : [s]);
      const container = views.find(
        (v: any) =>
          v.props.style &&
          styleArray(v.props.style).some(
            (sty: any) => sty && sty.backgroundColor === '#000000'
          )
      );
      expect(container).toBeTruthy();
      expect(styleArray(container!.props.style)).toEqual(
        expect.arrayContaining([
          expect.any(Object),
          expect.objectContaining({
            backgroundColor: '#000000',
            borderColor: customStyles.borderColor,
            borderRadius: customStyles.borderCornerRadius,
            borderWidth: customStyles.borderWidth,
          }),
        ])
      );

      const title = getByText('Notification Title');
      const body = getByText('Notification body text.');
      expect(title.props.style).toEqual(
        expect.arrayContaining([
          expect.any(Object),
          expect.objectContaining({ color: '#ff0000' }),
        ])
      );
      expect(body.props.style).toEqual(
        expect.arrayContaining([
          expect.any(Object),
          expect.objectContaining({ color: '#00ff00' }),
        ])
      );
    });

    it('should not render button container when message has no buttons', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: { ...baseMessage.elements, buttons: undefined },
      };
      const { queryByText } = render(
        <IterableEmbeddedNotification message={message} />
      );
      expect(queryByText('CTA')).toBeNull();
    });

    it('should not render button container when buttons array is empty', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: { ...baseMessage.elements, buttons: [] },
      };
      const { queryByText } = render(
        <IterableEmbeddedNotification message={message} />
      );
      expect(queryByText('Primary')).toBeNull();
    });
  });

  describe('Buttons', () => {
    const primaryButton: IterableEmbeddedMessageElementsButton = {
      id: 'btn-primary',
      title: 'Primary',
      action: { type: 'openUrl', data: 'https://example.com' },
    };
    const secondaryButton: IterableEmbeddedMessageElementsButton = {
      id: 'btn-secondary',
      title: 'Secondary',
    };

    it('should render buttons when message has buttons', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: {
          ...baseMessage.elements,
          buttons: [primaryButton, secondaryButton],
        },
      };
      const { getByText } = render(
        <IterableEmbeddedNotification message={message} />
      );
      expect(getByText('Primary')).toBeTruthy();
      expect(getByText('Secondary')).toBeTruthy();
    });

    it('should apply primary and secondary button text colors from parsedStyles', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: {
          ...baseMessage.elements,
          buttons: [primaryButton, secondaryButton],
        },
      };
      const { getByText } = render(
        <IterableEmbeddedNotification message={message} />
      );

      const primaryText = getByText('Primary');
      const secondaryText = getByText('Secondary');
      expect(primaryText.props.style).toEqual(
        expect.arrayContaining([
          expect.any(Object),
          expect.objectContaining({
            color: defaultParsedStyles.primaryBtnTextColor,
          }),
        ])
      );
      expect(secondaryText.props.style).toEqual(
        expect.arrayContaining([
          expect.any(Object),
          expect.objectContaining({
            color: defaultParsedStyles.secondaryBtnTextColor,
          }),
        ])
      );
    });

    it('should call handleButtonClick with correct button when button is pressed', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: {
          ...baseMessage.elements,
          buttons: [primaryButton, secondaryButton],
        },
      };
      const { getByText } = render(
        <IterableEmbeddedNotification message={message} />
      );

      fireEvent.press(getByText('Primary'));
      expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
      expect(mockHandleButtonClick).toHaveBeenCalledWith(primaryButton);

      fireEvent.press(getByText('Secondary'));
      expect(mockHandleButtonClick).toHaveBeenCalledTimes(2);
      expect(mockHandleButtonClick).toHaveBeenLastCalledWith(secondaryButton);
    });
  });

  describe('Message click', () => {
    it('should call handleMessageClick when message area is pressed', () => {
      const { getByText } = render(
        <IterableEmbeddedNotification message={baseMessage} />
      );

      fireEvent.press(getByText('Notification Title'));
      expect(mockHandleMessageClick).toHaveBeenCalledTimes(1);

      mockHandleMessageClick.mockClear();
      fireEvent.press(getByText('Notification body text.'));
      expect(mockHandleMessageClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('useEmbeddedView integration', () => {
    it('should call useEmbeddedView with Notification viewType and props', () => {
      const config = { backgroundColor: '#abc' } as any;
      const onButtonClick = jest.fn();
      const onMessageClick = jest.fn();

      render(
        <IterableEmbeddedNotification
          message={baseMessage}
          config={config}
          onButtonClick={onButtonClick}
          onMessageClick={onMessageClick}
        />
      );

      expect(mockUseEmbeddedView).toHaveBeenCalledTimes(1);
      expect(mockUseEmbeddedView).toHaveBeenCalledWith(
        IterableEmbeddedViewType.Notification,
        {
          message: baseMessage,
          config,
          onButtonClick,
          onMessageClick,
        }
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle message with missing elements', () => {
      const message: IterableEmbeddedMessage = {
        metadata: baseMessage.metadata,
        elements: undefined,
      };
      const { queryByText } = render(
        <IterableEmbeddedNotification message={message} />
      );
      expect(queryByText('Notification Title')).toBeNull();
      expect(queryByText('Notification body text.')).toBeNull();
    });

    it('should handle message with empty title and body without throwing', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: { title: '', body: '' },
      };
      const { getAllByText } = render(
        <IterableEmbeddedNotification message={message} />
      );
      const emptyTextNodes = getAllByText('');
      expect(emptyTextNodes.length).toBeGreaterThanOrEqual(1);
    });

    it('should render multiple buttons and call handleButtonClick with correct button for each', () => {
      const message: IterableEmbeddedMessage = {
        ...baseMessage,
        elements: {
          ...baseMessage.elements,
          buttons: [
            { id: 'unique-id-1', title: 'First' },
            { id: 'unique-id-2', title: 'Second' },
          ],
        },
      };
      const { getByText } = render(
        <IterableEmbeddedNotification message={message} />
      );
      expect(getByText('First')).toBeTruthy();
      expect(getByText('Second')).toBeTruthy();
      fireEvent.press(getByText('First'));
      expect(mockHandleButtonClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'unique-id-1', title: 'First' })
      );
      fireEvent.press(getByText('Second'));
      expect(mockHandleButtonClick).toHaveBeenLastCalledWith(
        expect.objectContaining({ id: 'unique-id-2', title: 'Second' })
      );
    });
  });
});
