module.exports = {
  preset: 'react-native',
  setupFiles: ["<rootDir>/ts/__mocks__/jest.setup.ts"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ["<rootDir>/ts/__tests__/**/*.[jt]s?(x)"]
};