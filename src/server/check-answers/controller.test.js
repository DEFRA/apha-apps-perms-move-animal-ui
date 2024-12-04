import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { pageTitle } from './controller.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SesessionTestHelper from '../common/test-helpers/session-helper.js'

describe('#CheckAnswers', () => {
  /** @type {Server} */
  let server
  let session

  const defaultState = {
    onOffFarm: 'off',
    cphNumber: '12/123/1234',
    address: {
      addressLine1: 'Starfleet Headquarters',
      addressLine2: '24-593 Federation Drive',
      addressTown: 'San Francisco',
      addressCounty: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    }
  }

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SesessionTestHelper.create(server)
    await session.setState('origin', defaultState)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/submit/check-answers',
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(parseDocument(payload).title).toEqual(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should redirect to task page if not all answers valid', async () => {
    await session.setState('origin', {})
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/submit/check-answers',
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/task-list')
  })

  it('Should display an error', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/submit/check-answers',
        payload: {}
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
    expect(payload).toEqual(
      expect.stringContaining(
        '<a href="#confirmation">You need to tick a declaration box</a>'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should redirect to itself when there is no error', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/submit/check-answers',
        payload: {
          confirmation: ['confirm', 'other']
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/check-answers')
  })

  it('Should redirect to itself when only `confirm` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/submit/check-answers',
        payload: {
          confirmation: 'confirm'
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/check-answers')
  })

  it('Should redirect to itself when only `other` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/submit/check-answers',
        payload: {
          confirmation: 'other'
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/check-answers')
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
