module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/src/__mocks__/jest.setup.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/@testing-library/jest-native/extend-expect',
  ],
  testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-gesture-handler|react-native-webview)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{cjs,js,jsx,mjs,ts,tsx}',
    '!src/**/*.test.{cjs,js,jsx,mjs,mdx,ts,tsx}',
    '!src/(__tests__|__mocks__)/*',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageThreshold: {
    global: {
      branches: 53,
      functions: 47,
      lines: 58,
      statements: 58,
    },
    'src/core/classes/Iterable.ts': {
      statements: 90,
      branches: 85,
      functions: 95,
      lines: 90,
    },
    'src/core/classes/IterableApi.ts': {
      statements: 95,
      branches: 70,
      functions: 95,
      lines: 95,
    },
    'src/core/classes/IterableConfig.ts': {
      statements: 95,
      branches: 90,
      functions: 90,
      lines: 95,
    },
  },
};
