/**
 * @type {Config}
 */
export default {
  verbose: true,
  silent: false,
  testTimeout: 15000,
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  projects: [
    '<rootDir>/jest-projects/core.js',
    '<rootDir>/jest-projects/fmd.js',
    '<rootDir>/jest-projects/exotics.js',
    '<rootDir>/jest-projects/tb.js'
  ]
}

/**
 * @import { Config } from 'jest'
 */
