import { renderHook, act } from '@testing-library/react-native';

import {
  useDeviceOrientation,
  type IterableDeviceOrientation,
} from './useDeviceOrientation';

describe('useDeviceOrientation', () => {
  let useWindowDimensionsSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    // Spy on useWindowDimensions
    useWindowDimensionsSpy = jest.spyOn(
      require('react-native'),
      'useWindowDimensions'
    );
  });

  afterEach(() => {
    useWindowDimensionsSpy.mockRestore();
  });

  describe('initial state', () => {
    it('should return portrait orientation for portrait screen dimensions', () => {
      // GIVEN screen dimensions in portrait mode
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return portrait orientation
      expect(result.current).toEqual({
        height: 800,
        width: 400,
        isPortrait: true,
      });
    });

    it('should return landscape orientation for landscape screen dimensions', () => {
      // GIVEN screen dimensions in landscape mode
      useWindowDimensionsSpy.mockReturnValue({
        height: 400,
        width: 800,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return landscape orientation
      expect(result.current).toEqual({
        height: 400,
        width: 800,
        isPortrait: false,
      });
    });

    it('should return portrait orientation for square screen dimensions', () => {
      // GIVEN square screen dimensions (height >= width should be portrait)
      useWindowDimensionsSpy.mockReturnValue({
        height: 500,
        width: 500,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return portrait orientation
      expect(result.current).toEqual({
        height: 500,
        width: 500,
        isPortrait: true,
      });
    });

    it('should handle edge case where height is slightly larger than width', () => {
      // GIVEN screen dimensions where height is slightly larger
      useWindowDimensionsSpy.mockReturnValue({
        height: 401,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return portrait orientation
      expect(result.current).toEqual({
        height: 401,
        width: 400,
        isPortrait: true,
      });
    });
  });

  describe('orientation changes', () => {
    it('should update orientation when screen rotates from portrait to landscape', () => {
      // GIVEN initial portrait dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      const { result, rerender } = renderHook(() => useDeviceOrientation());

      // THEN initial state should be portrait
      expect(result.current.isPortrait).toBe(true);

      // WHEN screen rotates to landscape
      useWindowDimensionsSpy.mockReturnValue({
        height: 400,
        width: 800,
        scale: 1,
        fontScale: 1,
      });

      act(() => {
        rerender(() => useDeviceOrientation());
      });

      // THEN orientation should update to landscape
      expect(result.current).toEqual({
        height: 400,
        width: 800,
        isPortrait: false,
      });
    });

    it('should update orientation when screen rotates from landscape to portrait', () => {
      // GIVEN initial landscape dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 400,
        width: 800,
        scale: 1,
        fontScale: 1,
      });

      const { result, rerender } = renderHook(() => useDeviceOrientation());

      // THEN initial state should be landscape
      expect(result.current.isPortrait).toBe(false);

      // WHEN screen rotates to portrait
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      act(() => {
        rerender(() => useDeviceOrientation());
      });

      // THEN orientation should update to portrait
      expect(result.current).toEqual({
        height: 800,
        width: 400,
        isPortrait: true,
      });
    });

    it('should handle multiple orientation changes', () => {
      // GIVEN initial portrait dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      const { result, rerender } = renderHook(() => useDeviceOrientation());

      // THEN initial state should be portrait
      expect(result.current.isPortrait).toBe(true);

      // WHEN rotating to landscape
      useWindowDimensionsSpy.mockReturnValue({
        height: 400,
        width: 800,
        scale: 1,
        fontScale: 1,
      });

      act(() => {
        rerender(() => useDeviceOrientation());
      });

      expect(result.current.isPortrait).toBe(false);

      // WHEN rotating back to portrait
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      act(() => {
        rerender(() => useDeviceOrientation());
      });

      expect(result.current.isPortrait).toBe(true);

      // WHEN rotating to landscape again
      useWindowDimensionsSpy.mockReturnValue({
        height: 400,
        width: 800,
        scale: 1,
        fontScale: 1,
      });

      act(() => {
        rerender(() => useDeviceOrientation());
      });

      expect(result.current.isPortrait).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle zero dimensions', () => {
      // GIVEN zero dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 0,
        width: 0,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return portrait (height >= width)
      expect(result.current).toEqual({
        height: 0,
        width: 0,
        isPortrait: true,
      });
    });

    it('should handle very large dimensions', () => {
      // GIVEN very large dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 10000,
        width: 5000,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return portrait
      expect(result.current).toEqual({
        height: 10000,
        width: 5000,
        isPortrait: true,
      });
    });

    it('should handle negative dimensions', () => {
      // GIVEN negative dimensions (edge case)
      useWindowDimensionsSpy.mockReturnValue({
        height: -100,
        width: -200,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return landscape (height >= width, -100 >= -200)
      expect(result.current).toEqual({
        height: -100,
        width: -200,
        isPortrait: true,
      });
    });

    it('should handle decimal dimensions', () => {
      // GIVEN decimal dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 800.5,
        width: 400.3,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should return portrait
      expect(result.current).toEqual({
        height: 800.5,
        width: 400.3,
        isPortrait: true,
      });
    });
  });

  describe('hook behavior', () => {
    it('should maintain consistent state across re-renders with same dimensions', () => {
      // GIVEN consistent dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      const { result, rerender } = renderHook(() => useDeviceOrientation());

      const initialResult = result.current;

      // WHEN component re-renders with same dimensions
      act(() => {
        rerender(() => useDeviceOrientation());
      });

      // THEN state should remain consistent
      expect(result.current).toEqual(initialResult);
    });

    it('should return new object reference when dimensions change', () => {
      // GIVEN initial dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      const { result, rerender } = renderHook(() => useDeviceOrientation());

      const initialResult = result.current;

      // WHEN dimensions change
      useWindowDimensionsSpy.mockReturnValue({
        height: 400,
        width: 800,
        scale: 1,
        fontScale: 1,
      });

      act(() => {
        rerender(() => useDeviceOrientation());
      });

      // THEN new object reference should be returned
      expect(result.current).not.toBe(initialResult);
      expect(result.current).toEqual({
        height: 400,
        width: 800,
        isPortrait: false,
      });
    });

    it('should handle rapid dimension changes', () => {
      // GIVEN initial dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      const { result, rerender } = renderHook(() => useDeviceOrientation());

      // WHEN rapid dimension changes occur
      const dimensions = [
        { height: 400, width: 800 }, // landscape
        { height: 800, width: 400 }, // portrait
        { height: 600, width: 600 }, // square
        { height: 300, width: 900 }, // landscape
      ];

      dimensions.forEach((dim) => {
        useWindowDimensionsSpy.mockReturnValue({
          ...dim,
          scale: 1,
          fontScale: 1,
        });

        act(() => {
          rerender(() => useDeviceOrientation());
        });

        expect(result.current.height).toBe(dim.height);
        expect(result.current.width).toBe(dim.width);
        expect(result.current.isPortrait).toBe(dim.height >= dim.width);
      });
    });
  });

  describe('type safety', () => {
    it('should return correct IterableDeviceOrientation interface', () => {
      // GIVEN screen dimensions
      useWindowDimensionsSpy.mockReturnValue({
        height: 800,
        width: 400,
        scale: 1,
        fontScale: 1,
      });

      // WHEN the hook is rendered
      const { result } = renderHook(() => useDeviceOrientation());

      // THEN it should match the interface
      const orientation: IterableDeviceOrientation = result.current;
      expect(typeof orientation.height).toBe('number');
      expect(typeof orientation.width).toBe('number');
      expect(typeof orientation.isPortrait).toBe('boolean');
    });
  });
});
