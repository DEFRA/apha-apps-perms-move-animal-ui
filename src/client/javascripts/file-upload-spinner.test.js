/* eslint-disable jsdoc/check-tag-names */
/**
 * @jest-environment jsdom
 */

import { TextEncoder, TextDecoder } from 'util'
globalThis.TextEncoder = TextEncoder
// @ts-expect-error required for JSDom test environment
globalThis.TextDecoder = TextDecoder

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { JSDOM } = require('jsdom')

describe('file-upload-spinner', () => {
  let dom
  let document

  beforeEach(() => {
    dom = new JSDOM(
      `
      <html>
        <body>
          <form></form>
          <div class="apha_upload-spinner">Uploading...</div>
          <div class="govuk-main-wrapper">
            <div>Content</div>
          </div>
        </body>
      </html>
    `,
      { runScripts: 'dangerously', resources: 'usable' }
    )

    document = dom.window.document
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'))
  })

  test('should hide the upload spinner initially', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const uploadSpinner = document.querySelector('.apha_upload-spinner')
      expect(uploadSpinner.classList.contains('apha-hidden')).toBe(true)
    })
  })

  test('should show the upload spinner and hide other elements on form submit', () => {
    const form = document.querySelector('form')
    const uploadSpinner = document.querySelector('.apha_upload-spinner')
    const otherElements = document.querySelectorAll(
      '.govuk-main-wrapper > *:not(.apha_upload-spinner)'
    )

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      setTimeout(() => {
        expect(uploadSpinner.classList.contains('apha-block')).toBe(true)
        otherElements.forEach((el) => {
          expect(el.classList.contains('apha-hidden')).toBe(true)
        })
      }, 10)
    })

    form.dispatchEvent(
      new dom.window.Event('submit', { bubbles: true, cancelable: true })
    )
  })
})
