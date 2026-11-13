import { spyOnConfig } from '~/src/server/common/test-helpers/config.js'
import {
  LANGUAGE_COOKIE_NAME,
  createLanguageCookiePlugin
} from './language-cookie-plugin.js'

describe('language cookie plugin', () => {
  const locales = ['en', 'cy']
  const continueSymbol = Symbol('continue')
  let server
  let h

  const getHandler = (event) =>
    server.ext.mock.calls.find(([name]) => name === event)[1]

  beforeEach(() => {
    spyOnConfig('session.cookie.secure', true)
    server = { state: jest.fn(), ext: jest.fn() }
    h = { continue: continueSymbol, state: jest.fn() }
    createLanguageCookiePlugin(locales).register(server)
  })

  it('should have a name', () => {
    expect(createLanguageCookiePlugin(locales).name).toBe('language-cookie')
  })

  it('should register the language state cookie', () => {
    expect(server.state).toHaveBeenCalledWith(
      LANGUAGE_COOKIE_NAME,
      expect.objectContaining({
        path: '/',
        isSecure: true,
        isHttpOnly: true,
        isSameSite: 'Lax',
        ttl: 365 * 24 * 60 * 60 * 1000
      })
    )
  })

  describe('onPreAuth', () => {
    const buildRequest = (state, query) => ({
      state,
      query,
      i18n: { setLocale: jest.fn() }
    })

    it('should apply the cookie locale when there is no query param', () => {
      const request = buildRequest({ language: 'cy' }, {})

      expect(getHandler('onPreAuth')(request, h)).toBe(continueSymbol)
      expect(request.i18n.setLocale).toHaveBeenCalledWith('cy')
    })

    it('should not override the locale when the query param is present', () => {
      const request = buildRequest({ language: 'cy' }, { lang: 'en' })

      expect(getHandler('onPreAuth')(request, h)).toBe(continueSymbol)
      expect(request.i18n.setLocale).not.toHaveBeenCalled()
    })

    it('should ignore a cookie locale that is not supported', () => {
      const request = buildRequest({ language: 'fr' }, {})

      expect(getHandler('onPreAuth')(request, h)).toBe(continueSymbol)
      expect(request.i18n.setLocale).not.toHaveBeenCalled()
    })

    it('should do nothing when there is no cookie or state', () => {
      const noCookie = buildRequest({}, {})
      const noState = buildRequest(undefined, undefined)

      expect(getHandler('onPreAuth')(noCookie, h)).toBe(continueSymbol)
      expect(getHandler('onPreAuth')(noState, h)).toBe(continueSymbol)
      expect(noCookie.i18n.setLocale).not.toHaveBeenCalled()
      expect(noState.i18n.setLocale).not.toHaveBeenCalled()
    })
  })

  describe('onPreResponse', () => {
    const buildRequest = (locale, query) => ({
      query,
      i18n: { getLocale: () => locale }
    })

    it('should set the cookie when the query param is present', () => {
      const request = buildRequest('cy', { lang: 'cy' })

      expect(getHandler('onPreResponse')(request, h)).toBe(continueSymbol)
      expect(h.state).toHaveBeenCalledWith(LANGUAGE_COOKIE_NAME, 'cy')
    })

    it('should not set the cookie without the query param', () => {
      const request = buildRequest('cy', {})

      expect(getHandler('onPreResponse')(request, h)).toBe(continueSymbol)
      expect(h.state).not.toHaveBeenCalled()
    })

    it('should not set the cookie for an unsupported locale', () => {
      const request = buildRequest('fr', { lang: 'fr' })

      expect(getHandler('onPreResponse')(request, h)).toBe(continueSymbol)
      expect(h.state).not.toHaveBeenCalled()
    })

    it('should not fail when i18n or query are missing', () => {
      expect(getHandler('onPreResponse')({}, h)).toBe(continueSymbol)
      expect(h.state).not.toHaveBeenCalled()
    })
  })
})
