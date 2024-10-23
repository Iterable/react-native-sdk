module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/src/__mocks__/jest.setup.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/@testing-library/jest-native/extend-expect',
  ],
  testMatch: ['<rootDir>/src/__tests__/**/*.(test|spec).[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)',
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
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
};
