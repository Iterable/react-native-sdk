import type { ReactNode } from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { Animated, PanResponder, View } from 'react-native';
import type { PanResponderGestureState } from 'react-native';

import { IterableInAppMessage, IterableInAppTrigger, IterableInAppTriggerType } from '../../inApp';
import { IterableInboxMetadata } from '../../inApp/classes/IterableInboxMetadata';
import { IterableInboxDataModel } from '../classes/IterableInboxDataModel';
import type { IterableInboxRowViewModel } from '../types';
import { ITERABLE_INBOX_COLORS } from '../constants';

import { IterableInboxMessageCell } from './IterableInboxMessageCell';

const actualReactNative = jest.requireActual(
  'react-native'
) as typeof import('react-native');
const actualPanResponderCreate =
  actualReactNative.PanResponder.create.bind(
    actualReactNative.PanResponder
  ) as typeof PanResponder.create;

type PanResponderConfig = NonNullable<
  Parameters<typeof PanResponder.create>[0]
>;

describe('IterableInboxMessageCell', () => {
  const contentWidth = 300;
  const scrollThreshold = contentWidth / 15;
  let lastPanResponderConfig: PanResponderConfig | undefined;

  const buildInAppMessage = (overrides?: { read?: boolean }) => {
    return new IterableInAppMessage(
      'msg-1',
      1,
      new IterableInAppTrigger(IterableInAppTriggerType.event),
      new Date('2025-01-15T12:00:00.000Z'),
      undefined,
      true,
      new IterableInboxMetadata('Row title', 'Row subtitle', undefined),
      undefined,
      overrides?.read ?? false,
      1
    );
  };

  const buildRowViewModel = (read: boolean): IterableInboxRowViewModel => ({
    title: 'Row title',
    subtitle: 'Row subtitle',
    read,
    inAppMessage: buildInAppMessage({ read }),
  });

  const baseProps = {
    index: 0,
    last: false,
    dataModel: new IterableInboxDataModel(),
    swipingCheck: jest.fn(),
    messageListItemLayout: jest.fn(() => undefined),
    deleteRow: jest.fn(),
    handleMessageSelect: jest.fn(),
    contentWidth,
    isPortrait: true,
    customizations: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    lastPanResponderConfig = undefined;
    jest.spyOn(PanResponder, 'create').mockImplementation((config) => {
      lastPanResponderConfig = config;
      return actualPanResponderCreate(config);
    });
    jest.spyOn(Animated, 'timing').mockImplementation(
      (
        value: Animated.Value | Animated.ValueXY,
        config: Animated.TimingAnimationConfig
      ) =>
        ({
          start: (callback?: (result: { finished: boolean }) => void) => {
            const to = config.toValue as { x?: number; y?: number } | number;
            if (
              value instanceof Animated.ValueXY &&
              to &&
              typeof to === 'object' &&
              'x' in to &&
              'y' in to
            ) {
              value.setValue({ x: to.x ?? 0, y: to.y ?? 0 });
            }
            callback?.({ finished: true });
            return { stop: jest.fn() };
          },
          stop: jest.fn(),
          reset: jest.fn(),
        }) as unknown as Animated.CompositeAnimation
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render default layout with title, subtitle, formatted date, and unread chrome', () => {
    // GIVEN an unread row
    const rowViewModel = buildRowViewModel(false);

    // WHEN the cell renders with default layout
    const { getByText, UNSAFE_root } = render(
      <IterableInboxMessageCell
        {...baseProps}
        rowViewModel={rowViewModel}
      />
    );

    // THEN title, subtitle, and date are shown
    expect(getByText('Row title')).toBeTruthy();
    expect(getByText('Row subtitle')).toBeTruthy();
    const expectedDate = baseProps.dataModel.getFormattedDate(
      rowViewModel.inAppMessage
    );
    expect(expectedDate).toBeDefined();
    expect(getByText(expectedDate as string)).toBeTruthy();

    // AND the unread indicator dot is present
    const unreadDots = UNSAFE_root.findAll(
      (node) =>
        node.type === View &&
        typeof node.props.style === 'object' &&
        node.props.style !== null &&
        !Array.isArray(node.props.style) &&
        (node.props.style as { backgroundColor?: string }).backgroundColor ===
          ITERABLE_INBOX_COLORS.UNREAD
    );
    expect(unreadDots.length).toBeGreaterThan(0);
  });

  it('should render read state without the unread indicator', () => {
    // GIVEN a read row
    const rowViewModel = buildRowViewModel(true);

    // WHEN the cell renders
    const { UNSAFE_root } = render(
      <IterableInboxMessageCell
        {...baseProps}
        rowViewModel={rowViewModel}
      />
    );

    // THEN no unread dot is rendered
    const unreadDots = UNSAFE_root.findAll(
      (node) =>
        node.type === View &&
        typeof node.props.style === 'object' &&
        node.props.style !== null &&
        !Array.isArray(node.props.style) &&
        (node.props.style as { backgroundColor?: string }).backgroundColor ===
          ITERABLE_INBOX_COLORS.UNREAD
    );
    expect(unreadDots.length).toBe(0);
  });

  it('should use messageListItemLayout when it returns content', () => {
    // GIVEN a custom layout factory
    const messageListItemLayout = jest.fn(
      (_isLast: boolean, _row: IterableInboxRowViewModel) =>
        [
          <View key="custom">
            <View accessibilityLabel="custom-layout-marker" />
          </View>,
          88,
        ] as [ReactNode, number]
    );

    // WHEN the cell renders
    const { getByLabelText } = render(
      <IterableInboxMessageCell
        {...baseProps}
        messageListItemLayout={messageListItemLayout}
        rowViewModel={buildRowViewModel(false)}
      />
    );

    // THEN the layout function is used and the custom tree is shown
    expect(messageListItemLayout).toHaveBeenCalled();
    expect(getByLabelText('custom-layout-marker')).toBeTruthy();
  });

  it('should call handleMessageSelect with message id and index when the row is pressed', () => {
    const handleMessageSelect = jest.fn();
    const rowViewModel = buildRowViewModel(false);

    const { getByText } = render(
      <IterableInboxMessageCell
        {...baseProps}
        handleMessageSelect={handleMessageSelect}
        rowViewModel={rowViewModel}
        index={3}
      />
    );

    fireEvent.press(getByText('Row title'));

    expect(handleMessageSelect).toHaveBeenCalledWith('msg-1', 3);
  });

  it('should call deleteRow with the message id after a full left swipe completes', () => {
    const deleteRow = jest.fn();
    const rowViewModel = buildRowViewModel(false);

    render(
      <IterableInboxMessageCell
        {...baseProps}
        deleteRow={deleteRow}
        rowViewModel={rowViewModel}
      />
    );

    const config = lastPanResponderConfig;
    expect(config).toBeDefined();

    const gesture = (dx: number, dy: number): PanResponderGestureState =>
      ({ dx, dy }) as PanResponderGestureState;

    act(() => {
      config!.onPanResponderGrant?.(
        {} as Parameters<
          NonNullable<PanResponderConfig['onPanResponderGrant']>
        >[0],
        {} as PanResponderGestureState
      );
      config!.onPanResponderMove?.(
        {} as Parameters<
          NonNullable<PanResponderConfig['onPanResponderMove']>
        >[0],
        gesture(-scrollThreshold - 5, -1)
      );
      config!.onPanResponderRelease?.(
        {} as Parameters<
          NonNullable<PanResponderConfig['onPanResponderRelease']>
        >[0],
        gesture(-0.7 * contentWidth, 0)
      );
    });

    expect(deleteRow).toHaveBeenCalledWith('msg-1');
  });
});
