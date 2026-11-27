import { JSDOM } from 'jsdom'
/* global expect */

/**
 * @param {string} payload
 * @returns {Document}
 */
export const parseDocument = (payload) => new JSDOM(payload).window.document

/**
 * @param {Document} document
 * @param {{ message: string, href?: string, input?: { selector: string, value: string } }} options
 */
export const expectValidationError = (document, { message, href, input }) => {
  const summary = document.querySelector('.govuk-error-summary__list a')
  expect(summary?.textContent?.trim()).toBe(message)
  expect(document.querySelector('.govuk-error-message')?.textContent).toContain(
    message
  )

  if (href !== undefined) {
    expect(summary?.getAttribute('href')).toBe(href)
  }

  if (input) {
    expect(document.querySelector(input.selector)?.getAttribute('value')).toBe(
      input.value
    )
  }
}
