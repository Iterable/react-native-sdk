module.exports = {
  preset: 'react-native',
  setupFiles: ["<rootDir>/ts/__mocks__/jest.setup.js"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ["<rootDir>/ts/__tests__/**/*.[jt]s?(x)"]
};