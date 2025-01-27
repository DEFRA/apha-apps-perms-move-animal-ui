/**
 * @type {Config}
 */
export default {
  rootDir: '.',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  silent: false,
  testMatch: ['**/src/**/*.test.js', '**/user-journey-tests/config/*.test.js'],
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  modulePathIgnorePatterns: ['<rootDir>/.server'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/server/common/test-helpers'
  ],
  coverageDirectory: '<rootDir>/coverage'
}

/**
 * @import { Config } from 'jest'
 */
