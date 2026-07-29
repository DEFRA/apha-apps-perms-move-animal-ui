/**
 * @param {import('@hapi/hapi').Request | null | undefined} request
 * @param {string | undefined} key
 * @param {string} fallback
 * @param {Record<string, unknown>} [params]
 * @returns {string}
 */
export function translate(request, key, fallback, params) {
  const requestI18n = /** @type {any} */ (request)

  if (!key || !requestI18n?.i18n?.__) {
    return fallback
  }

  const translated = requestI18n.i18n.__(key, params)
  return translated === key ? fallback : translated
}

/**
 * @param {import('@hapi/hapi').Request | null | undefined} request
 * @returns {string}
 */
export function getLocale(request) {
  const requestI18n = /** @type {any} */ (request)

  return requestI18n?.i18n?.getLocale?.() ?? 'en'
}
