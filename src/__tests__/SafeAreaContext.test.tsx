import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import {
  ConditionalSafeAreaView,
  ConditionalSafeAreaProvider,
  getSafeAreaView,
  getSafeAreaProvider,
  SafeAreaContextNotAvailableError,
} from '../core/utils/SafeAreaContext';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  throw new Error('Module not found');
});

describe('SafeAreaContext', () => {
  describe('ConditionalSafeAreaView', () => {
    it('should fallback to View when react-native-safe-area-context is not available', () => {
      const { getByText } = render(
        <ConditionalSafeAreaView>
          <Text>Test content</Text>
        </ConditionalSafeAreaView>
      );

      // Should render the children
      expect(getByText('Test content')).toBeTruthy();
    });

    it('should log warning when falling back to View', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(
        <ConditionalSafeAreaView>
          <Text>Test content</Text>
        </ConditionalSafeAreaView>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'SafeAreaView is not available. Falling back to regular View.'
        )
      );

      consoleSpy.mockRestore();
    });
  });

  describe('ConditionalSafeAreaProvider', () => {
    it('should fallback to Fragment when react-native-safe-area-context is not available', () => {
      const { getByText } = render(
        <ConditionalSafeAreaProvider>
          <Text>Test content</Text>
        </ConditionalSafeAreaProvider>
      );

      // Should render the children directly
      expect(getByText('Test content')).toBeTruthy();
    });

    it('should log warning when falling back to Fragment', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(
        <ConditionalSafeAreaProvider>
          <Text>Test content</Text>
        </ConditionalSafeAreaProvider>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'SafeAreaProvider is not available. Falling back to Fragment.'
        )
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getSafeAreaView', () => {
    it('should throw SafeAreaContextNotAvailableError when library is not available', () => {
      expect(() => getSafeAreaView()).toThrow(SafeAreaContextNotAvailableError);
      expect(() => getSafeAreaView()).toThrow(
        'react-native-safe-area-context is required for SafeAreaView but is not installed'
      );
    });
  });

  describe('getSafeAreaProvider', () => {
    it('should throw SafeAreaContextNotAvailableError when library is not available', () => {
      expect(() => getSafeAreaProvider()).toThrow(
        SafeAreaContextNotAvailableError
      );
      expect(() => getSafeAreaProvider()).toThrow(
        'react-native-safe-area-context is required for SafeAreaProvider but is not installed'
      );
    });
  });
});
