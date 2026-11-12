import { fileURLToPath } from 'node:url'
import path from 'path'
import nunjucks from 'nunjucks'
import { load } from 'cheerio'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const env = nunjucks.configure(
  [
    path.resolve(dirname, '../../../../../node_modules/govuk-frontend/dist/'),
    dirname,
    path.resolve(dirname, '..')
  ],
  { autoescape: true, trimBlocks: true, lstripBlocks: true }
)

/**
 * @param {object} params
 */
const renderLanguageNavigation = (params) =>
  load(
    env.renderString(
      `{%- from "language-navigation/macro.njk" import govukLanguageNavigation -%}{{- govukLanguageNavigation(params) -}}`,
      { params }
    )
  )

describe('Language Navigation Component', () => {
  const items = [
    { text: 'English', lang: 'en', current: true },
    { text: 'Cymraeg', lang: 'cy', href: '?lang=cy' }
  ]

  /** @type {CheerioAPI} */
  let $

  describe('Default', () => {
    beforeEach(() => {
      $ = renderLanguageNavigation({ items })
    })

    test('Should render a labelled nav with one list item per language', () => {
      const $nav = $('nav.govuk-language-navigation')

      expect($nav).toHaveLength(1)
      expect($nav.attr('aria-label')).toBe('Language')
      expect($('.govuk-language-navigation__list-item')).toHaveLength(2)
    })

    test('Should render the current language as text, not a link', () => {
      const $current = $('.govuk-language-navigation__text')

      expect($current).toHaveLength(1)
      expect($current.text().trim()).toBe('English')
      expect($current.attr('aria-current')).toBe('true')
      expect($current.attr('lang')).toBe('en')
      expect($current.is('a')).toBe(false)
    })

    test('Should render other languages as links', () => {
      const $link = $('a.govuk-language-navigation__link')

      expect($link).toHaveLength(1)
      expect($link.text().trim()).toBe('Cymraeg')
      expect($link.attr('href')).toBe('?lang=cy')
      expect($link.attr('lang')).toBe('cy')
      expect($link.attr('hreflang')).toBe('cy')
      expect($link.attr('rel')).toBe('alternate')
    })
  })

  describe('With options', () => {
    test('Should add classes after the base class separated by a space', () => {
      $ = renderLanguageNavigation({ items, classes: 'govuk-!-margin-top-3' })

      expect($('nav').attr('class')).toBe(
        'govuk-language-navigation govuk-!-margin-top-3'
      )
    })

    test('Should use a custom aria label', () => {
      $ = renderLanguageNavigation({ items, ariaLabel: 'Iaith' })

      expect($('nav').attr('aria-label')).toBe('Iaith')
    })

    test('Should add attributes to the nav', () => {
      $ = renderLanguageNavigation({
        items,
        attributes: { 'data-testid': 'language-navigation' }
      })

      expect($('[data-testid="language-navigation"]')).toHaveLength(1)
    })

    test('Should treat an item without href as the current language', () => {
      $ = renderLanguageNavigation({
        items: [{ text: 'English' }, { text: 'Cymraeg', href: '?lang=cy' }]
      })

      expect($('.govuk-language-navigation__text').text().trim()).toBe(
        'English'
      )
      expect($('a.govuk-language-navigation__link')).toHaveLength(1)
    })

    test('Should render visually hidden language description for links', () => {
      $ = renderLanguageNavigation({
        items: [
          {
            text: 'Cymraeg',
            href: '?lang=cy',
            languageDescriptionText: 'Welsh'
          }
        ]
      })

      expect($('.govuk-visually-hidden').text().trim()).toBe('Welsh')
    })
  })
})

/**
 * @import { CheerioAPI } from 'cheerio'
 */
