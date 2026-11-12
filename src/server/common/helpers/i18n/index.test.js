import {
  LANGUAGE_QUERY_PARAM,
  getLanguageUrl,
  getLocale,
  translate
} from './index.js'

describe('i18n helpers', () => {
  describe('LANGUAGE_QUERY_PARAM', () => {
    it('should be lang', () => {
      expect(LANGUAGE_QUERY_PARAM).toBe('lang')
    })
  })

  describe('translate', () => {
    it('should return the translation', () => {
      const __ = jest.fn().mockReturnValue('Newid')
      const request = {
        i18n: { __ }
      }

      expect(
        translate(/** @type { any } */ (request), 'common.change', 'Change', {
          a: 1
        })
      ).toBe('Newid')
      expect(__).toHaveBeenCalledWith('common.change', { a: 1 })
    })

    it('should return the fallback when the key is not translated', () => {
      const request = {
        i18n: { __: (/** @type {string} */ key) => key }
      }

      expect(
        translate(/** @type { any } */ (request), 'common.change', 'Change')
      ).toBe('Change')
    })

    it.each([
      ['request is null', null, 'common.change'],
      ['request is undefined', undefined, 'common.change'],
      ['request has no i18n', {}, 'common.change'],
      ['i18n has no __', { i18n: {} }, 'common.change'],
      ['key is undefined', { i18n: { __: () => 'x' } }, undefined],
      ['key is empty', { i18n: { __: () => 'x' } }, '']
    ])('should return the fallback when %s', (_name, request, key) => {
      expect(translate(/** @type {any} */ (request), key, 'Change')).toBe(
        'Change'
      )
    })
  })

  describe('getLocale', () => {
    it('should return the request locale', () => {
      expect(
        getLocale(/** @type {any} */ ({ i18n: { getLocale: () => 'cy' } }))
      ).toBe('cy')
    })

    it.each([
      ['null request', null],
      ['undefined request', undefined],
      ['no i18n', {}],
      ['no getLocale', { i18n: {} }],
      [
        'getLocale returning undefined',
        { i18n: { getLocale: () => undefined } }
      ]
    ])('should default to en with %s', (_name, request) => {
      expect(getLocale(/** @type {any} */ (request))).toBe('en')
    })
  })

  describe('getLanguageUrl', () => {
    it('should return only the lang param when there is no query', () => {
      expect(getLanguageUrl(/** @type {any} */ ({ query: {} }), 'cy')).toBe(
        '?lang=cy'
      )
    })

    it('should handle a missing request or query', () => {
      expect(getLanguageUrl(null, 'en')).toBe('?lang=en')
      expect(getLanguageUrl(/** @type {any} */ ({}), 'en')).toBe('?lang=en')
    })

    it('should keep other query params', () => {
      expect(
        getLanguageUrl(/** @type {any} */ ({ query: { a: '1', b: '2' } }), 'cy')
      ).toBe('?a=1&b=2&lang=cy')
    })

    it('should replace an existing lang param', () => {
      expect(
        getLanguageUrl(
          /** @type {any} */ ({ query: { lang: 'en', a: '1' } }),
          'cy'
        )
      ).toBe('?a=1&lang=cy')
    })

    it('should keep array values', () => {
      expect(
        getLanguageUrl(/** @type {any} */ ({ query: { a: ['1', '2'] } }), 'en')
      ).toBe('?a=1&a=2&lang=en')
    })

    it('should encode values', () => {
      expect(
        getLanguageUrl(/** @type {any} */ ({ query: { q: 'a b&c' } }), 'en')
      ).toBe('?q=a+b%26c&lang=en')
    })
  })
})
