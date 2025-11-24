import baseConfig from './base.js'

/**
 * @type {Config}
 */
export default {
  ...baseConfig,
  displayName: 'fmd',
  testMatch: ['**/src/server/fmd/**/*.test.js']
}

/**
 * @import { Config } from 'jest'
 */
