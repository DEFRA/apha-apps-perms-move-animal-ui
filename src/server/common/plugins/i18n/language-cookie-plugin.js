import { config } from '~/src/config/config.js'
import { LANGUAGE_QUERY_PARAM } from '../../helpers/i18n/index.js'

/** @import {Request} from '@hapi/hapi' */

export const LANGUAGE_COOKIE_NAME = 'language'
const oneYearMs = 365 * 24 * 60 * 60 * 1000

/**
 * Persists the selected locale in a cookie. Must be registered after hapi-i18n,
 * which handles the `?lang=` query parameter in its own onPreAuth extension.
 * @param {string[]} locales
 */
export const createLanguageCookiePlugin = (locales) => ({
  name: 'language-cookie',
  register(server) {
    server.state(LANGUAGE_COOKIE_NAME, {
      ttl: oneYearMs,
      path: '/',
      isSecure: config.get('session.cookie.secure'),
      isHttpOnly: true,
      isSameSite: 'Lax',
      strictHeader: false,
      ignoreErrors: true,
      clearInvalid: true
    })

    server.ext('onPreAuth', (request, h) => {
      const cookieLocale = request.state?.[LANGUAGE_COOKIE_NAME]
      const hasQueryLocale = Boolean(request.query?.[LANGUAGE_QUERY_PARAM])

      if (!hasQueryLocale && locales.includes(cookieLocale)) {
        request.i18n.setLocale(cookieLocale)
      }

      return h.continue
    })

    server.ext('onPreResponse', (request, h) => {
      const locale = request.i18n?.getLocale?.()

      if (
        locale &&
        request.query?.[LANGUAGE_QUERY_PARAM] &&
        locales.includes(locale)
      ) {
        h.state(LANGUAGE_COOKIE_NAME, locale)
      }

      return h.continue
    })
  }
})
