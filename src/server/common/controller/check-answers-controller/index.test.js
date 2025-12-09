import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../test-helpers/session-helper.js'
import {
  validApplicationState,
  validOriginSectionState
} from '../../test-helpers/journey-state.js'
import { spyOnConfig } from '../../test-helpers/config.js'
import { sizeErrorPage } from '../../../tb/biosecurity-map/size-error/index.js'
import {
  getFormContext,
  getFirstJourneyPage,
  mapFormContextToAnswers
} from '~/src/server/common/plugins/defra-forms/form-context.js'

import Wreck from '@hapi/wreck'
import Boom from '@hapi/boom'
import { config } from '~/src/config/config.js'
import { ConfirmationPage, SubmitSummaryPage } from './index.js'
import { ConfirmationAnswer } from '../../model/answer/confirmation/confirmation.js'

jest.mock('~/src/server/common/plugins/defra-forms/form-context.js')

/** @import { IncomingMessage } from 'http' */
/** @import { Server } from '@hapi/hapi' */

const {
  origin,
  destination,
  licence,
  identification,
  biosecurity,
  'biosecurity-map': biosecurityMap
} = validApplicationState
const pageTitle = 'Check your answers before sending your application'
const confirmationUri = '/tb/submit/confirmation'
const checkAnswersUri = '/tb/submit/check-answers'
const originAnswers = [
  {
    question: 'Are you moving the animals on or off your farm or premises?',
    questionKey: 'onOffFarm',
    slug: '/origin/to-or-from-own-premises',
    answer: {
      type: 'text',
      value: 'on',
      displayText: 'On to the farm or premises'
    }
  },
  {
    question: 'Which type of premises are the animals moving off?',
    questionKey: 'originType',
    slug: '/origin/type-of-origin',
    answer: {
      type: 'text',
      value: 'tb-restricted-farm',
      displayText: 'TB restricted farm'
    }
  },
  {
    question:
      'What is the county parish holding (CPH) number of the farm or premises where the animals are moving off?',
    questionKey: 'cphNumber',
    slug: '/origin/origin-farm-cph',
    answer: {
      type: 'text',
      value: '12/345/6789',
      displayText: '12/345/6789'
    }
  },
  {
    question:
      'What is the address of the farm or premises where the animals are moving off?',
    questionKey: 'address',
    slug: '/origin/origin-farm-address',
    answer: {
      type: 'address',
      value: validOriginSectionState.address,
      displayText: 'Starfleet Headquarters<br>San Francisco<br>RG24 8RR'
    }
  }
]
const mockOriginPage = { getHref: jest.fn((path) => path), path: '/origin' }

describe('#SubmitPageController', () => {
  /** @type {Server} */
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    jest.mocked(getFormContext).mockResolvedValue({
      errors: [],
      relevantPages: [mockOriginPage]
    })
    jest.mocked(getFirstJourneyPage).mockReturnValue(mockOriginPage)
    jest.mocked(mapFormContextToAnswers).mockReturnValue(originAnswers)
    session = await SessionTestHelper.create(server)
    await session.setSectionState('origin', origin)
    await session.setSectionState('licence', licence)
    await session.setSectionState('destination', destination)
    await session.setSectionState('identification', identification)
    await session.setSectionState('biosecurity', biosecurity)
    await session.setSectionState('biosecurity-map', biosecurityMap)
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
    expect(document.querySelector('#main-content')?.innerHTML).toMatchSnapshot()
    expect(document.title).toEqual(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)
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

  it('Should redirect if not all tasks are complete (valid)', async () => {
    await session.setSectionState('origin', {})

    const { headers, statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/tb/task-list-incomplete')
  })

  it('should return a 500 error if submit fails for any other reason', async () => {
    const wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
      res: /** @type {IncomingMessage} */ ({
        statusCode: 400
      }),
      payload: JSON.stringify({
        message: 'An error occured'
      })
    })

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.serverError)
    expect(wreckSpy).toHaveBeenCalledTimes(1)
  })

  it('should redirect to the size error page if the file is too large', async () => {
    const wreckSpy = jest.spyOn(Wreck, 'post').mockImplementation(() => {
      const error = Boom.badRequest('Dummy error')
      error.output.statusCode = statusCodes.fileTooLarge
      throw error
    })

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

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(sizeErrorPage.urlPath)
    expect(wreckSpy).toHaveBeenCalledTimes(1)
  })

  it('should give the user a 500 error if the case management API doesnt work for what ever reason', async () => {
    jest.spyOn(Wreck, 'post').mockResolvedValue({
      res: /** @type {IncomingMessage} */ ({
        statusCode: 502
      }),
      payload: ''
    })

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.serverError)
  })

  it('should send the application to case management and redirect to confirmation page', async () => {
    const dummyReferenceNumber = '12-1234-1234'

    const wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
      res: /** @type {IncomingMessage} */ ({
        statusCode: 200
      }),
      payload: JSON.stringify({
        message: dummyReferenceNumber
      })
    })

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

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)

    const { reference } = await session.getState('tb-confirmation-details')

    expect(reference).toBe(dummyReferenceNumber)
    expect(wreckSpy).toHaveBeenCalledTimes(1)
    expect(wreckSpy.mock.calls[0][0]).toBe(
      `${config.get('caseManagementApi').baseUrl}/submit`
    )
  })

  it('should log "User submitted application on behalf of themselves" when confirm option is selected', async () => {
    const dummyReferenceNumber = '12-1234-1234'
    spyOnConfig('featureFlags', {
      sendToCaseManagement: true
    })

    const wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
      res: /** @type {IncomingMessage} */ ({
        statusCode: 200
      }),
      payload: JSON.stringify({
        message: dummyReferenceNumber
      })
    })

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.redirect)
    expect(wreckSpy).toHaveBeenCalledTimes(1)
  })

  it('should log "User submitted application on behalf of someone else" when other option is selected', async () => {
    const dummyReferenceNumber = '12-1234-1234'

    const wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
      res: /** @type {IncomingMessage} */ ({
        statusCode: 200
      }),
      payload: JSON.stringify({
        message: dummyReferenceNumber
      })
    })

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.redirect)
    expect(wreckSpy).toHaveBeenCalledTimes(1)
  })
})

describe('#SubmitSummaryPage', () => {
  const page = new SubmitSummaryPage()
  const sectionKey = 'submit'
  const questionKey = 'check-answers'
  const question =
    'Before you submit your application, you must select one of the declaration check boxes.'
  const view = 'common/controller/check-answers-controller/index'

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(ConfirmationAnswer)
  })

  it('nextPage should return ConfirmationPage"', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBeInstanceOf(ConfirmationPage)
  })

  it('should export page', () => {
    expect(page).toBeInstanceOf(SubmitSummaryPage)
  })
})

describe('#ConfirmationPage', () => {
  const page = new ConfirmationPage()
  const pageUrl = '/submit/confirmation'

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })
})
