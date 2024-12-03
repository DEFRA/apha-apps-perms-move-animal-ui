import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { pageTitle } from './controller.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTester from '../../common/test-helpers/session-helper.js'

const testEmail = 'test@domain.com'

describe('licenseEmailAddress', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/receiving-the-licence/licence-enter-email-address'
    })

    expect(parseDocument(payload).title).toEqual(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should process the result and provide expected response', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/receiving-the-licence/licence-enter-email-address',
        payload: {
          emailAddress: testEmail
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)

    expect(headers.location).toBe('/receiving-the-licence/check-answers')
  })

  it('Should display an error to the user if no value entered', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/receiving-the-licence/licence-enter-email-address',
        payload: {}
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

    expect(payload).toEqual(expect.stringContaining('There is a problem'))
    expect(payload).toEqual(
      expect.stringContaining(
        'Enter the email address you would like the licence sent to'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should display an error when the user entered an invalid email address', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/receiving-the-licence/licence-enter-email-address',
        payload: {
          emailAddress: 'invalid format'
        }
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

    expect(payload).toEqual(expect.stringContaining('There is a problem'))
    expect(payload).toEqual(
      expect.stringContaining(
        'Enter an email address in the correct format, like name@example.com'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('when there is data already in the session', () => {
    let session

    beforeEach(async () => {
      session = await SessionTester.create(server)
      await session.setState('license', {
        emailAddress: testEmail
      })
    })

    it('should repopulate the form from state', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/receiving-the-licence/licence-enter-email-address'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.ok)
      expect(payload).toEqual(
        expect.stringContaining(
          `<input class="govuk-input govuk-input--width-20" id="email-address" name="emailAddress" type="email" spellcheck="false" value="${testEmail}" autocomplete="email-address">`
        )
      )
    })
  })

  describe('when nextPage is provided', () => {
    it('should set the next page appropriately', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: '/receiving-the-licence/licence-enter-email-address?redirect_uri=/receiving-the-licence/check-answers'
      })

      expect(payload).toEqual(
        expect.stringContaining(
          '<input type="hidden" name="nextPage" value="/receiving-the-licence/check-answers" />'
        )
      )

      expect(statusCode).toBe(statusCodes.ok)
    })

    it('should redirect to summary page if it came from there', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/receiving-the-licence/licence-enter-email-address',
          payload: {
            emailAddress: testEmail,
            nextPage: '/receiving-the-licence/check-answers'
          }
        })
      )

      expect(headers.location).toBe('/receiving-the-licence/check-answers')
      expect(statusCode).toBe(statusCodes.redirect)
    })

    it('Should display an error and set next page appropriately', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/receiving-the-licence/licence-enter-email-address',
          payload: {
            emailAddress: 'invalid format',
            nextPage: '/receiving-the-licence/check-answers'
          }
        })
      )

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
      expect(payload).toEqual(
        expect.stringContaining(
          '<input type="hidden" name="nextPage" value="/receiving-the-licence/check-answers" />'
        )
      )

      expect(statusCode).toBe(statusCodes.ok)
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
