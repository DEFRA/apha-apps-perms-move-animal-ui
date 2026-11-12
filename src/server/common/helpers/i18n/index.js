export const LANGUAGE_QUERY_PARAM = 'lang'

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

/**
 * Relative URL for the current page in the given locale, keeping any other query params.
 * @param {import('@hapi/hapi').Request | null | undefined} request
 * @param {string} locale
 * @returns {string}
 */
export function getLanguageUrl(request, locale) {
  const params = new URLSearchParams()

  Object.entries(request?.query ?? {}).forEach(([key, value]) => {
    if (key !== LANGUAGE_QUERY_PARAM) {
      ;[value].flat().forEach((item) => params.append(key, String(item)))
    }
  })
  params.set(LANGUAGE_QUERY_PARAM, locale)

  return `?${params.toString()}`
}
