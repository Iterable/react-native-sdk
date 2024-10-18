/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 1200000,
  maxWorkers: 1,
  // globalSetup: 'detox/runners/jest/globalSetup',
  globalSetup: './e2e/globalSetup.js',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  setupFilesAfterEnv: ['./e2e/setup.js'],
  verbose: true,
};
