/**
 * @type {Config}
 */
export default {
  displayName: 'core',
  rootDir: '..',
  resetModules: true,
  clearMocks: true,
  testMatch: ['**/src/**/*.test.js', '**/user-journey-tests/config/*.test.js'],
  testPathIgnorePatterns: ['.*fmd.*'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  modulePathIgnorePatterns: ['<rootDir>/.server'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/server/common/test-helpers',
    '<rootDir>/src/client/javascripts'
  ],
  coverageDirectory: '<rootDir>/coverage'
}

/**
 * @import { Config } from 'jest'
 */
