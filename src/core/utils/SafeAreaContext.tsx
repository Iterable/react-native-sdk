/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
import React from 'react';
import { View, type ViewStyle } from 'react-native';

/**
 * Error thrown when react-native-safe-area-context is required but not available
 */
export class SafeAreaContextNotAvailableError extends Error {
  constructor(componentName: string) {
    super(
      `react-native-safe-area-context is required for ${componentName} but is not installed. ` +
        'Please install it by running: npm install react-native-safe-area-context ' +
        'or yarn add react-native-safe-area-context'
    );
    this.name = 'SafeAreaContextNotAvailableError';
  }
}

/**
 * Conditionally imports and returns SafeAreaView from react-native-safe-area-context
 * @throws \{SafeAreaContextNotAvailableError\} When the library is not available
 */
export const getSafeAreaView = () => {
  try {
    const { SafeAreaView } = require('react-native-safe-area-context');
    return SafeAreaView;
  } catch {
    throw new SafeAreaContextNotAvailableError('SafeAreaView');
  }
};

/**
 * Conditionally imports and returns SafeAreaProvider from react-native-safe-area-context
 * @throws \{SafeAreaContextNotAvailableError\} When the library is not available
 */
export const getSafeAreaProvider = () => {
  try {
    const { SafeAreaProvider } = require('react-native-safe-area-context');
    return SafeAreaProvider;
  } catch {
    throw new SafeAreaContextNotAvailableError('SafeAreaProvider');
  }
};

/**
 * Conditionally imports and returns useSafeAreaInsets from react-native-safe-area-context
 * @throws \{SafeAreaContextNotAvailableError\} When the library is not available
 */
export const getUseSafeAreaInsets = () => {
  try {
    const { useSafeAreaInsets } = require('react-native-safe-area-context');
    return useSafeAreaInsets;
  } catch {
    throw new SafeAreaContextNotAvailableError('useSafeAreaInsets');
  }
};

/**
 * Conditionally imports and returns useSafeAreaFrame from react-native-safe-area-context
 * @throws \{SafeAreaContextNotAvailableError\} When the library is not available
 */
export const getUseSafeAreaFrame = () => {
  try {
    const { useSafeAreaFrame } = require('react-native-safe-area-context');
    return useSafeAreaFrame;
  } catch {
    throw new SafeAreaContextNotAvailableError('useSafeAreaFrame');
  }
};

/**
 * A conditional SafeAreaView component that only loads react-native-safe-area-context when needed
 */
export interface ConditionalSafeAreaViewProps {
  style?: ViewStyle;
  children: React.ReactNode;
  edges?: string[];
  mode?: 'padding' | 'margin';
}

export const ConditionalSafeAreaView: React.FC<
  ConditionalSafeAreaViewProps
> = ({ style, children, edges, mode }) => {
  try {
    const SafeAreaView = getSafeAreaView();
    return (
      <SafeAreaView style={style} edges={edges} mode={mode}>
        {children}
      </SafeAreaView>
    );
  } catch {
    // Fallback to regular View if SafeAreaView is not available
    console.warn(
      'SafeAreaView is not available. Falling back to regular View. ' +
        'Install react-native-safe-area-context for proper safe area handling.'
    );
    return <View style={style}>{children}</View>;
  }
};

/**
 * A conditional SafeAreaProvider component that only loads react-native-safe-area-context when needed
 */
export interface ConditionalSafeAreaProviderProps {
  children: React.ReactNode;
  initialMetrics?: unknown;
}

export const ConditionalSafeAreaProvider: React.FC<
  ConditionalSafeAreaProviderProps
> = ({ children, initialMetrics }) => {
  try {
    const SafeAreaProvider = getSafeAreaProvider();
    return (
      <SafeAreaProvider initialMetrics={initialMetrics}>
        {children}
      </SafeAreaProvider>
    );
  } catch {
    // Fallback to Fragment if SafeAreaProvider is not available
    console.warn(
      'SafeAreaProvider is not available. Falling back to Fragment. ' +
        'Install react-native-safe-area-context for proper safe area handling.'
    );
    return <>{children}</>;
  }
};
