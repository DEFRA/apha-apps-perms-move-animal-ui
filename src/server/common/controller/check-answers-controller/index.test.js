import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../test-helpers/session-helper.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'
import { spyOnConfig } from '../../test-helpers/config.js'
import { sizeErrorPage } from '../../../tb/biosecurity-map/size-error/index.js'

import Wreck from '@hapi/wreck'
import Boom from '@hapi/boom'
import { config } from '~/src/config/config.js'

/**
 * @import { IncomingMessage } from 'http'
 */

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

  describe('when sendToCaseManagement feature flag is enabled', () => {
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
            url: checkAnswersUri + '?case-management-api=true',
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

    it('should redirect to the sizze error page if the file is too large', async () => {
      const wreckSpy = jest.spyOn(Wreck, 'post').mockImplementation(() => {
        const error = Boom.badRequest('Dummy error')
        error.output.statusCode = statusCodes.fileTooLarge
        throw error
      })

      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: checkAnswersUri + '?case-management-api=true',
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

    it('should send the application to case management when feature flag is disabled but query string present', async () => {
      const dummyReferenceNumber = '12-1234-1234'
      spyOnConfig('featureFlags', {
        sendToCaseManagement: false
      })

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
            url: checkAnswersUri + '?case-management-api=true',
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

      const { reference, 'state-key': stateKey } = await session.getState(
        'tb-confirmation-details'
      )
      expect(reference).toBe(dummyReferenceNumber)
      expect(stateKey).toBe('application')
      expect(wreckSpy).toHaveBeenCalledTimes(1)
      expect(wreckSpy.mock.calls[0][0]).toBe(
        `${config.get('caseManagementApi').baseUrl}/submit`
      )
    })

    it('should give the user a 500 error if the case management API doesnt work for what ever reason', async () => {
      spyOnConfig('featureFlags', {
        sendToCaseManagement: true
      })

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
})

/**
 * @import { Server } from '@hapi/hapi'
 */
