/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from '@testing-library/react-native';
import { PixelRatio } from 'react-native';
import { HeaderBackButton, ICON_MARGIN, ICON_SIZE } from './HeaderBackButton';

describe('HeaderBackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { getByTestId } = render(<HeaderBackButton testID="back-button" />);
      expect(getByTestId('back-button')).toBeTruthy();
    });

    it('should render with default back arrow image', () => {
      const { UNSAFE_getByType } = render(<HeaderBackButton />);
      const image = UNSAFE_getByType('Image' as any);
      expect(image).toBeTruthy();
      expect(image.props.source).toMatchObject({
        uri: expect.stringContaining('data:image/png;base64'),
        width: PixelRatio.getPixelSizeForLayoutSize(ICON_SIZE),
        height: PixelRatio.getPixelSizeForLayoutSize(ICON_SIZE),
      });
    });

    it('should render without label by default', () => {
      const { queryByText } = render(<HeaderBackButton />);
      expect(queryByText(/./)).toBeNull();
    });

    it('should render with label when provided', () => {
      const label = 'Back';
      const { getByText } = render(<HeaderBackButton label={label} />);
      expect(getByText(label)).toBeTruthy();
    });

    it('should render with custom label text', () => {
      const customLabel = 'Go Back to Home';
      const { getByText } = render(<HeaderBackButton label={customLabel} />);
      expect(getByText(customLabel)).toBeTruthy();
    });
  });

  describe('Custom Image Props', () => {
    it('should render with custom imageUri', () => {
      const customUri = 'https://example.com/custom-back-icon.png';
      const { UNSAFE_getByType } = render(
        <HeaderBackButton imageUri={customUri} />
      );
      const image = UNSAFE_getByType('Image' as any);
      expect(image.props.source).toMatchObject({
        uri: customUri,
      });
    });

    it('should render with custom imageSource', () => {
      const customSource = { uri: 'https://example.com/icon.png' };
      const { UNSAFE_getByType } = render(
        <HeaderBackButton imageSource={customSource} />
      );
      const image = UNSAFE_getByType('Image' as any);
      expect(image.props.source).toEqual(customSource);
    });

    it('should prioritize imageSource over imageUri when both are provided', () => {
      const customUri = 'https://example.com/custom-back-icon.png';
      const customSource = { uri: 'https://example.com/icon.png' };
      const { UNSAFE_getByType } = render(
        <HeaderBackButton imageUri={customUri} imageSource={customSource} />
      );
      const image = UNSAFE_getByType('Image' as any);
      expect(image.props.source).toEqual(customSource);
    });
  });

  describe('Image Properties', () => {
    it('should render image with correct properties', () => {
      const { UNSAFE_getByType } = render(<HeaderBackButton />);
      const image = UNSAFE_getByType('Image' as any);

      expect(image.props.resizeMode).toBe('contain');
      expect(image.props.fadeDuration).toBe(0);
      expect(image.props.height).toBe(ICON_SIZE);
      expect(image.props.width).toBe(ICON_SIZE);
      expect(image.props.resizeMethod).toBe('scale');
      expect(image.props.tintColor).toBeTruthy();
    });

    it('should apply correct style to image', () => {
      const { UNSAFE_getByType } = render(<HeaderBackButton />);
      const image = UNSAFE_getByType('Image' as any);

      expect(image.props.style).toMatchObject({
        height: ICON_SIZE,
        margin: ICON_MARGIN,
        width: ICON_SIZE,
      });
    });
  });

  describe('Touch Interaction', () => {
    it('should call onPress when button is pressed', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = render(
        <HeaderBackButton testID="back-button" onPress={onPressMock} />
      );

      fireEvent.press(getByTestId('back-button'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should call onPressIn when touch starts', () => {
      const onPressInMock = jest.fn();
      const { getByTestId } = render(
        <HeaderBackButton testID="back-button" onPressIn={onPressInMock} />
      );

      fireEvent(getByTestId('back-button'), 'pressIn');
      expect(onPressInMock).toHaveBeenCalledTimes(1);
    });

    it('should call onPressOut when touch ends', () => {
      const onPressOutMock = jest.fn();
      const { getByTestId } = render(
        <HeaderBackButton testID="back-button" onPressOut={onPressOutMock} />
      );

      fireEvent(getByTestId('back-button'), 'pressOut');
      expect(onPressOutMock).toHaveBeenCalledTimes(1);
    });

    it('should not trigger onPress when disabled', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = render(
        <HeaderBackButton
          testID="back-button"
          onPress={onPressMock}
          disabled={true}
        />
      );

      fireEvent.press(getByTestId('back-button'));
      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe('Platform-specific behavior', () => {
    it('should export correct icon size constant', () => {
      // ICON_SIZE is evaluated at module load time based on Platform.OS
      expect(ICON_SIZE).toBeDefined();
      expect([21, 24]).toContain(ICON_SIZE);
    });

    it('should export correct icon margin constant', () => {
      // ICON_MARGIN is evaluated at module load time based on Platform.OS
      expect(ICON_MARGIN).toBeDefined();
      expect([3, 8]).toContain(ICON_MARGIN);
    });

    it('should use consistent icon size in image props', () => {
      const { UNSAFE_getByType } = render(<HeaderBackButton />);
      const image = UNSAFE_getByType('Image' as any);

      expect(image.props.height).toBe(ICON_SIZE);
      expect(image.props.width).toBe(ICON_SIZE);
    });
  });

  describe('Accessibility', () => {
    it('should accept accessibility props', () => {
      const { getByTestId } = render(
        <HeaderBackButton
          testID="back-button"
          accessible={true}
          accessibilityLabel="Navigate back"
          accessibilityHint="Returns to previous screen"
        />
      );

      const button = getByTestId('back-button');
      expect(button.props.accessible).toBe(true);
      expect(button.props.accessibilityLabel).toBe('Navigate back');
      expect(button.props.accessibilityHint).toBe('Returns to previous screen');
    });
  });

  describe('Component Structure', () => {
    it('should render View with correct flex direction', () => {
      const { UNSAFE_getAllByType } = render(<HeaderBackButton label="Back" />);
      const views = UNSAFE_getAllByType('View' as any);

      // Find the view with returnButton style
      const returnButtonView = views.find(
        (view) =>
          view.props.style?.flexDirection === 'row' &&
          view.props.style?.alignItems === 'center'
      );
      expect(returnButtonView).toBeTruthy();
    });

    it('should render label text with correct style when provided', () => {
      const { getByText } = render(<HeaderBackButton label="Back" />);
      const labelElement = getByText('Back');

      expect(labelElement.props.style).toMatchObject({
        fontSize: 20,
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string label', () => {
      const { queryByText } = render(<HeaderBackButton label="" />);
      // Empty string should not render text
      expect(queryByText('')).toBeNull();
    });

    it('should handle multiple props correctly', () => {
      const onPressMock = jest.fn();
      const label = 'Custom Back';
      const customUri = 'https://example.com/icon.png';

      const { getByText, getByTestId } = render(
        <HeaderBackButton
          testID="back-button"
          label={label}
          imageUri={customUri}
          onPress={onPressMock}
          accessible={true}
          accessibilityLabel="Go back"
        />
      );

      expect(getByText(label)).toBeTruthy();
      expect(getByTestId('back-button').props.accessible).toBe(true);

      fireEvent.press(getByTestId('back-button'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });
});
