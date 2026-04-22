import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Iterable } from '../../core/classes/Iterable';
import { EmbeddedSessionManager } from './EmbeddedSessionManager';

describe('EmbeddedSessionManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Iterable.embeddedManager, 'startSession').mockImplementation(
      () => {}
    );
    jest.spyOn(Iterable.embeddedManager, 'endSession').mockImplementation(
      () => {}
    );
  });

  it('renders its children', () => {
    const { getByTestId } = render(
      <EmbeddedSessionManager>
        <Text testID="embedded-child">hello</Text>
      </EmbeddedSessionManager>
    );

    expect(getByTestId('embedded-child')).toBeTruthy();
  });

  it('starts session on mount and ends session on unmount', () => {
    const { unmount } = render(
      <EmbeddedSessionManager>
        <Text>child</Text>
      </EmbeddedSessionManager>
    );

    expect(Iterable.embeddedManager.startSession).toHaveBeenCalledTimes(1);
    expect(Iterable.embeddedManager.endSession).not.toHaveBeenCalled();

    unmount();

    expect(Iterable.embeddedManager.endSession).toHaveBeenCalledTimes(1);
  });

  it('does not double track session for nested wrappers', () => {
    const { unmount } = render(
      <EmbeddedSessionManager>
        <EmbeddedSessionManager>
          <Text>nested child</Text>
        </EmbeddedSessionManager>
      </EmbeddedSessionManager>
    );

    expect(Iterable.embeddedManager.startSession).toHaveBeenCalledTimes(1);

    unmount();

    expect(Iterable.embeddedManager.endSession).toHaveBeenCalledTimes(1);
  });

  it('does not start session when isActive is false', () => {
    const { unmount } = render(
      <EmbeddedSessionManager isActive={false}>
        <Text>child</Text>
      </EmbeddedSessionManager>
    );

    expect(Iterable.embeddedManager.startSession).not.toHaveBeenCalled();

    unmount();

    expect(Iterable.embeddedManager.endSession).not.toHaveBeenCalled();
  });

  it('ends session when isActive becomes false and restarts when true again', () => {
    const { rerender } = render(
      <EmbeddedSessionManager isActive={true}>
        <Text>child</Text>
      </EmbeddedSessionManager>
    );

    expect(Iterable.embeddedManager.startSession).toHaveBeenCalledTimes(1);

    rerender(
      <EmbeddedSessionManager isActive={false}>
        <Text>child</Text>
      </EmbeddedSessionManager>
    );

    expect(Iterable.embeddedManager.endSession).toHaveBeenCalledTimes(1);

    rerender(
      <EmbeddedSessionManager isActive={true}>
        <Text>child</Text>
      </EmbeddedSessionManager>
    );

    expect(Iterable.embeddedManager.startSession).toHaveBeenCalledTimes(2);
  });
});
