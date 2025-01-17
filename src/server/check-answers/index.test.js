import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../common/test-helpers/session-helper.js'
import { sendNotification } from '../common/connectors/notify/notify.js'

jest.mock('../common/connectors/notify/notify.js', () => ({
  sendNotification: jest.fn()
}))
const mockSendNotifiation = /** @type {jest.Mock} */ (sendNotification)

const testCphNumber = '12/123/1234'
const testAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressLine2: '24-593 Federation Drive',
  addressTown: 'San Francisco',
  addressCounty: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}
const testEmailAddress = 'name@example.com'
const testReceiveMethod = 'email'

const originDefaultState = {
  onOffFarm: 'off',
  cphNumber: testCphNumber,
  originType: 'afu',
  address: testAddress
}

const licenceDefaultState = {
  emailAddress: testEmailAddress,
  receiveMethod: testReceiveMethod,
  fullName: {
    firstName: 'William T.',
    lastName: 'Riker'
  }
}

const destinationDefaultState = {
  destinationType: 'dedicated-sale'
}
const expectedDestinationText = 'Dedicated sale for TB (orange market)'

const pageTitle = 'Check your answers before sending your application'
const confirmationUri = '/submit/confirmation'
const checkAnswersUri = '/submit/check-answers'
const taskListIncompleteUri = '/task-list-incomplete'

const emailContent = [
  '## Are you moving the animals on or off your farm or premises?',
  'Off the farm or premises',
  '## What type of premises are the animals moving off?',
  'Approved finishing unit (AFU)',
  '## What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?',
  testCphNumber,
  '## What is the address of your farm or premises where the animals are moving off?',
  testAddress.addressLine1,
  testAddress.addressLine2,
  testAddress.addressTown,
  testAddress.addressCounty,
  testAddress.addressPostcode,
  '## Where are the animals going to?',
  expectedDestinationText,
  '## What is the name of the County Parish Holding (CPH) owner?',
  licenceDefaultState.fullName.firstName +
    ' ' +
    licenceDefaultState.fullName.lastName,
  '## How would you like this licence sent to you?',
  testReceiveMethod,
  '## What email address would you like the licence sent to?',
  testEmailAddress
].join('\n')

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
    await session.setState('destination', destinationDefaultState)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: checkAnswersUri,
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(document.title).toEqual(pageTitle)
    expect(document.querySelector('#main-content')?.innerHTML).toMatchSnapshot()

    const taskListValues = document.querySelectorAll(
      '.govuk-summary-list__value'
    )

    expect(taskListValues[0].innerHTML).toContain('Off the farm or premises')
    expect(taskListValues[1].innerHTML).toContain(
      'Approved finishing unit (AFU)'
    )
    expect(taskListValues[2].innerHTML).toContain(testCphNumber)
    expect(taskListValues[3].innerHTML).toContain(testAddress.addressLine1)
    expect(taskListValues[4].innerHTML).toContain(expectedDestinationText)
    expect(taskListValues[5].innerHTML).toContain(
      `${licenceDefaultState.fullName.firstName} ${licenceDefaultState.fullName.lastName}`
    )
    expect(taskListValues[6].innerHTML).toContain(testReceiveMethod)
    expect(taskListValues[7].innerHTML).toContain(testEmailAddress)

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should redirect to task-incomplete page if not all answers valid', async () => {
    await session.setState('origin', {})
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: checkAnswersUri,
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(taskListIncompleteUri)
  })

  it('Should stay in check-answers if all tasks are valid', async () => {
    const { statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: checkAnswersUri
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should not send an email on POST and display an error if a declaration is missing', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
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

  it('should not send an email and redirect to task incomplete on POST if application is invalid', async () => {
    await session.setState('origin', {})
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(sendNotification).not.toHaveBeenCalled()
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(taskListIncompleteUri)
  })

  it('Should redirect correctly when there is no error', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {
            confirmation: ['confirm', 'other']
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const [{ content }] = mockSendNotifiation.mock.calls[0]

    expect(content).toBe(emailContent)
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
  })

  it('Should send email and redirect correctly when only `confirm` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {
            confirmation: 'confirm'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const [{ content }] = mockSendNotifiation.mock.calls[0]

    expect(content).toBe(emailContent)
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
  })

  it('Should send email and redirect correctly when only `other` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {
            confirmation: 'other'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const [{ content }] = mockSendNotifiation.mock.calls[0]

    expect(content).toBe(emailContent)
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
