import baseConfig from './base.js'

/**
 * @type {Config}
 */
export default {
  ...baseConfig,
  displayName: 'core',
  testMatch: ['**/src/**/*.test.js', '**/user-journey-tests/config/*.test.js'],
  testPathIgnorePatterns: [
    'src/server/tb/*',
    'src/server/fmd/*',
    'src/server/exotics/*'
  ]
}

/**
 * @import { Config } from 'jest'
 */
