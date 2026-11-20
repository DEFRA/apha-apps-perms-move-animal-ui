import { translate } from '../helpers/i18n/index.js'

/**
 * @param {string | undefined} key
 * @param {string} fallback
 * @returns {string}
 */
export function fallbackTranslate(key, fallback) {
  return translate(null, key, fallback)
}
