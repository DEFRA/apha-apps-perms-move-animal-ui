/**
 * Base Jest configuration shared across all test projects
 * @type {Config}
 */
export default {
  rootDir: '..',
  resetModules: true,
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  modulePathIgnorePatterns: ['<rootDir>/.server'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@defra/forms-engine-plugin$':
      '<rootDir>/.jest/mocks/forms-engine-plugin.js'
  },
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
