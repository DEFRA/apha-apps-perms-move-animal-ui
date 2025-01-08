import { createServer } from '~/src/server/index.js'
import { submitSummaryPage } from './index.js'
import { statusCodes } from '../common/constants/status-codes.js'
import SessionTester from '../common/test-helpers/session-helper.js'
import { withCsrfProtection } from '../common/test-helpers/csrf.js'
import { parseDocument } from '../common/test-helpers/dom.js'

describe('#checkAnswers', () => {
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
  })

  it('should return the correct urlPath for SubmitSummaryPage', () => {
    expect(submitSummaryPage.urlPath).toBe('/submit/check-answers')
  })

  it('should return the correct view for SubmitSummaryPage', () => {
    expect(submitSummaryPage.view).toBe('check-answers/index')
  })

  it('should return the correct nextPage for SubmitSummaryPage', () => {
    const nextPage = submitSummaryPage.nextPage()
    expect(nextPage.urlPath).toBe('/submit/confirmation')
  })

  it('Should redirect to incomplete if no state given', async () => {
    const { headers, statusCode } = await server.inject({
      method: 'GET',
      url: '/submit/check-answers'
    })

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/task-list-incomplete')
  })

  it('Should provide expected response', async () => {
    await session.setState('origin', {
      onOffFarm: 'off',
      originType: 'afu',
      cphNumber: '12/345/6789',
      address: {
        addressLine1: '73 OCEANA CRESCENT',
        addressLine2: 'Archronos Ltd',
        addressTown: 'Basingstoke',
        addressCounty: 'Hampshire',
        addressPostcode: 'RG224FF'
      }
    })

    await session.setState('destination', {
      destinationType: 'afu'
    })

    await session.setState('licence', {
      emailAddress: 'here@there.com',
      receiveMethod: 'email'
    })

    const { payload, statusCode } = await server.inject(
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
    expect(parseDocument(payload).title).toBe(
      'Check your answers before sending your application'
    )
  })
})
