/**
 * @type {Options}
 */
export default {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.njk',
      options: {
        parser: 'html'
      }
    }
  ]
}

/**
 * @import { Options } from 'prettier'
 */
