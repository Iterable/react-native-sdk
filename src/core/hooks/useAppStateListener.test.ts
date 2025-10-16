import { renderHook, act } from '@testing-library/react-native';
import { AppState } from 'react-native';

import { useAppStateListener } from './useAppStateListener';

describe('useAppStateListener', () => {
  let mockListener: { remove: jest.Mock };
  let addEventListenerSpy: jest.SpyInstance;
  let currentStateGetter: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockListener = { remove: jest.fn() };

    // Spy on AppState methods
    addEventListenerSpy = jest
      .spyOn(AppState, 'addEventListener')
      .mockReturnValue(mockListener);

    // Mock the currentState property
    Object.defineProperty(AppState, 'currentState', {
      get: jest.fn(() => 'active'),
      configurable: true,
    });
    currentStateGetter = jest.spyOn(AppState, 'currentState', 'get');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    currentStateGetter.mockRestore();
  });

  it('should return initial app state', () => {
    // GIVEN the hook is rendered
    const { result } = renderHook(() => useAppStateListener());

    // THEN it should return the current app state
    expect(result.current).toBe('active');
  });

  it('should set up AppState listener on mount', () => {
    // WHEN the hook is rendered
    renderHook(() => useAppStateListener());

    // THEN AppState.addEventListener should be called with correct parameters
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('should update state when app state changes to background', () => {
    // GIVEN the hook is rendered
    const { result } = renderHook(() => useAppStateListener());

    // Get the listener callback
    const listenerCallback = addEventListenerSpy.mock.calls[0][1];

    // WHEN app state changes to background
    act(() => {
      listenerCallback('background');
    });

    // THEN the hook should return the new state
    expect(result.current).toBe('background');
  });

  it('should update state when app state changes to inactive', () => {
    // GIVEN the hook is rendered
    const { result } = renderHook(() => useAppStateListener());

    // Get the listener callback
    const listenerCallback = addEventListenerSpy.mock.calls[0][1];

    // WHEN app state changes to inactive
    act(() => {
      listenerCallback('inactive');
    });

    // THEN the hook should return the new state
    expect(result.current).toBe('inactive');
  });

  it('should update state when app state changes back to active', () => {
    // GIVEN the hook is rendered and state is initially background
    const { result } = renderHook(() => useAppStateListener());
    const listenerCallback = addEventListenerSpy.mock.calls[0][1];

    act(() => {
      listenerCallback('background');
    });
    expect(result.current).toBe('background');

    // WHEN app state changes back to active
    act(() => {
      listenerCallback('active');
    });

    // THEN the hook should return active
    expect(result.current).toBe('active');
  });

  it('should handle multiple state changes', () => {
    // GIVEN the hook is rendered
    const { result } = renderHook(() => useAppStateListener());
    const listenerCallback = addEventListenerSpy.mock.calls[0][1];

    // WHEN multiple state changes occur
    act(() => {
      listenerCallback('background');
    });
    expect(result.current).toBe('background');

    act(() => {
      listenerCallback('inactive');
    });
    expect(result.current).toBe('inactive');

    act(() => {
      listenerCallback('active');
    });
    expect(result.current).toBe('active');
  });

  it('should clean up listener on unmount', () => {
    // GIVEN the hook is rendered
    const { unmount } = renderHook(() => useAppStateListener());

    // WHEN the component unmounts
    unmount();

    // THEN the listener should be removed
    expect(mockListener.remove).toHaveBeenCalledTimes(1);
  });

  it('should handle initial state with different AppState.currentState', () => {
    // GIVEN AppState.currentState is set to background
    currentStateGetter.mockReturnValue('background');

    // WHEN the hook is rendered
    const { result } = renderHook(() => useAppStateListener());

    // THEN it should return the background state
    expect(result.current).toBe('background');
  });

  it('should handle initial state with inactive AppState.currentState', () => {
    // GIVEN AppState.currentState is set to inactive
    currentStateGetter.mockReturnValue('inactive');

    // WHEN the hook is rendered
    const { result } = renderHook(() => useAppStateListener());

    // THEN it should return the inactive state
    expect(result.current).toBe('inactive');
  });

  it('should not call addEventListener multiple times on re-renders', () => {
    // GIVEN the hook is rendered
    const { rerender } = renderHook(() => useAppStateListener());

    // WHEN the component re-renders
    rerender(() => useAppStateListener());
    rerender(() => useAppStateListener());

    // THEN addEventListener should only be called once
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it('should maintain state consistency across re-renders', () => {
    // GIVEN the hook is rendered and state changes
    const { result, rerender } = renderHook(() => useAppStateListener());
    const listenerCallback = addEventListenerSpy.mock.calls[0][1];

    act(() => {
      listenerCallback('background');
    });
    expect(result.current).toBe('background');

    // WHEN the component re-renders
    rerender(() => useAppStateListener());

    // THEN the state should remain consistent
    expect(result.current).toBe('background');
  });
});
