import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../common/test-helpers/session-helper.js'
import { sendNotification } from '../common/connectors/notify/notify.js'
import {
  validApplicationStateWithBioSecurity,
  validDestinationSectionState,
  validOriginSectionState
} from '../common/test-helpers/journey-state.js'
import { spyOnConfig } from '../common/test-helpers/config.js'
import { handleUploadedFile } from '../common/helpers/file/file-utils.js'

const testFile = 'test_file'
const testFileBase64 = 'dGVzdF9maWxl'

// Mock the handleUploadedFile function
jest.mock('../common/helpers/file/file-utils.js', () => ({
  handleUploadedFile: jest.fn().mockResolvedValue(Buffer.from(testFile))
}))
const mockHandleUploadedFile = /** @type {jest.Mock} */ (handleUploadedFile)

jest.mock('../common/connectors/notify/notify.js', () => ({
  sendNotification: jest.fn()
}))
const mockSendNotification = /** @type {jest.Mock} */ (sendNotification)

const {
  origin,
  destination,
  licence,
  identification,
  biosecurity,
  'biosecurity-map': biosecurityMap
} = validApplicationStateWithBioSecurity
const pageTitle = 'Check your answers before sending your application'
const confirmationUri = '/submit/confirmation'
const checkAnswersUri = '/submit/check-answers'
const taskListIncompleteUri = '/task-list-incomplete'

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
    await session.setState('origin', origin)
    await session.setState('licence', licence)
    await session.setState('destination', destination)
    await session.setState('identification', identification)
    await session.setState('biosecurity', biosecurity)
    await session.setState('biosecurity-map', biosecurityMap)
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

  it('should error if email fails ot send for whatever reason', async () => {
    mockSendNotification.mockImplementationOnce(() => {
      throw new Error('Failed to send email')
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

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toMatchSnapshot('email-content')
    expect(mockSendNotification).toHaveBeenCalledTimes(1)
    expect(statusCode).toBe(statusCodes.serverError)
    expect(await session.getState('origin')).toEqual(origin)
    expect(await session.getState('destination')).toEqual(destination)
    expect(await session.getState('licence')).toEqual(licence)
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

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toMatchSnapshot('email-content')
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
  })

  it('Should send email and redirect correctly when only `confirm` present', async () => {
    spyOnConfig('notify', {
      fileRetention: '1 week',
      confirmDownloadConfirmation: true
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

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toMatchSnapshot('email-content')
    expect(mockSendNotification).toHaveBeenCalledTimes(1)
    expect(mockSendNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        link_to_file: {
          confirm_email_before_download: true,
          file: testFileBase64,
          filename: 'Biosecurity-map.jpg',
          retention_period: '1 week'
        }
      })
    )
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
    expect(await session.getState('origin')).toBeUndefined()
    expect(await session.getState('destination')).toBeUndefined()
    expect(await session.getState('licence')).toBeUndefined()
    expect(await session.getState('submit')).toBeUndefined()
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

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toMatchSnapshot('email-content')
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
  })

  it('should send email in correct format', async () => {
    spyOnConfig('featureFlags', { biosecurity: false })

    await session.setState('origin', validOriginSectionState)
    await session.setState('destination', validDestinationSectionState)

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

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(statusCode).toBe(statusCodes.redirect)
    expect(content).toMatchSnapshot('email-content-biosec-disabled')
  })

  it('should send email in correct format for flag enabled', async () => {
    spyOnConfig('featureFlags', { biosecurity: true })

    await session.setState(
      'origin',
      validApplicationStateWithBioSecurity.origin
    )
    await session.setState(
      'destination',
      validApplicationStateWithBioSecurity.destination
    )

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

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(statusCode).toBe(statusCodes.redirect)
    expect(content).toMatchSnapshot('email-content-biosec-enabled')
  })

  it('should compress the file and send email in correct format for flag enabled', async () => {
    spyOnConfig('featureFlags', { biosecurity: true })

    await session.setState(
      'origin',
      validApplicationStateWithBioSecurity.origin
    )
    await session.setState(
      'destination',
      validApplicationStateWithBioSecurity.destination
    )

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
    expect(handleUploadedFile).toHaveBeenCalledTimes(1)
  })

  it('should compress the file and return a 500 error if the file is too large', async () => {
    spyOnConfig('featureFlags', { biosecurity: true })

    await session.setState(
      'origin',
      validApplicationStateWithBioSecurity.origin
    )
    await session.setState(
      'destination',
      validApplicationStateWithBioSecurity.destination
    )

    mockHandleUploadedFile.mockResolvedValueOnce(Buffer.alloc(3 * 1024 * 1024))

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

    expect(statusCode).toBe(statusCodes.serverError)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
