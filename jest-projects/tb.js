import baseConfig from './base.js'

/**
 * @type {Config}
 */
export default {
  ...baseConfig,
  displayName: 'tb',
  testMatch: ['**/src/server/tb/**/*.test.js']
}

/**
 * @import { Config } from 'jest'
 */
