module.exports = {
  preset: 'react-native',
  setupFiles: ["<rootDir>/jest/setup.js"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ["<rootDir>/ts/__tests__/**/*.[jt]s?(x)"]
};