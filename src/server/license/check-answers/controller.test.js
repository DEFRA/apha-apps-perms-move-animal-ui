import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

import { pageTitle } from './controller.js'
import SesessionTestHelper from '~/src/server/common/test-helpers/session-helper.js'

const testEmail = 'test@domain.com'

describe('licenseCheckAnswersController', () => {
  /** @type {Server} */
  let server

  /** @type {SesessionTestHelper} */
  let session

  const defaultState = {
    emailAddress: testEmail
  }

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SesessionTestHelper.create(server)

    await session.setState('license', defaultState)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/receiving-the-licence/check-answers'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(document.title).toBe(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)

    expect(payload).toEqual(expect.stringContaining(testEmail))
  })

  describe('should redirect to specific page when fields are missing from state', () => {
    it('should not show email address value', async () => {
      await session.setState('license', {
        ...defaultState,
        emailAddress: undefined
      })

      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/receiving-the-licence/check-answers'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe(
        '/receiving-the-licence/licence-enter-email-address?redirect_uri=/receiving-the-licence/check-answers'
      )
      expect(statusCode).toBe(statusCodes.redirect)
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
