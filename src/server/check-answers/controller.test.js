import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { pageTitle } from './controller.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../common/test-helpers/session-helper.js'
import { sendNotification } from '../common/helpers/notify/notify.js'

jest.mock('../common/helpers/notify/notify.js', () => ({
  sendNotification: jest.fn()
}))

const originDefaultState = {
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

const licenceDefaultState = {
  emailAddress: 'name@example.com'
}

const onOffFarmEmailContent =
  '## Are you moving the animals on or off your farm or premises? \n Off the farm or premises'

describe('#CheckAnswers', () => {
  /** @type {Server} */
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)
    await session.setState('origin', originDefaultState)
    await session.setState('licence', licenceDefaultState)
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

    const document = parseDocument(payload)
    expect(document.title).toEqual(pageTitle)

    const taskListValues = document.querySelectorAll(
      '.govuk-summary-list__value'
    )

    expect(taskListValues[0].innerHTML).toContain('Off the farm or premises')
    expect(taskListValues[1].innerHTML).toContain('12/123/1234')
    expect(taskListValues[2].innerHTML).toContain('Starfleet Headquarters')
    expect(taskListValues[3].innerHTML).toContain('name@example.com')

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should redirect to task-incomplete page if not all answers valid', async () => {
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
    expect(headers.location).toBe('/task-list-incomplete')
  })

  it('Should stay in check-answers if all tasks are valid', async () => {
    const { statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/submit/check-answers'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should redirect to task-list-incomplete if any task is invalid', async () => {
    await session.setState('licence', {})

    const { statusCode, headers } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/submit/check-answers'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/task-list-incomplete')
  })

  it('Should not send email and display an error', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: '/submit/check-answers',
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
    expect(payload).toEqual(
      expect.stringContaining(
        '<a href="#confirmation">You need to tick a declaration box</a>'
      )
    )

    expect(sendNotification).not.toHaveBeenCalled()
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should redirect correctly when there is no error', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: '/submit/check-answers',
          payload: {
            confirmation: ['confirm', 'other']
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(sendNotification).toHaveBeenCalledWith({
      content: expect.stringContaining(onOffFarmEmailContent)
    })
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/confirmation')
  })

  it('Should send email and redirect correctly when only `confirm` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: '/submit/check-answers',
          payload: {
            confirmation: 'confirm'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(sendNotification).toHaveBeenCalledWith({
      content: expect.stringContaining(onOffFarmEmailContent)
    })
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/confirmation')
  })

  it('Should send email and redirect correctly when only `other` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: '/submit/check-answers',
          payload: {
            confirmation: 'other'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(sendNotification).toHaveBeenCalledWith({
      content: expect.stringContaining(onOffFarmEmailContent)
    })
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/confirmation')
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
