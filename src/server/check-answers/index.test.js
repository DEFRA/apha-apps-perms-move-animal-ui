import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../common/test-helpers/session-helper.js'
import { sendNotification } from '../common/connectors/notify/notify.js'
import path from 'path'
import { createReadStream } from 'fs'
import { validApplicationStateWithBioSecurity } from '../common/test-helpers/journey-state.js'

const mockSend = jest.fn().mockImplementation(() => {
  const filePath = path.resolve(
    './src/server/check-answers/example-portrait.jpg'
  )
  const fileStream = createReadStream(filePath)
  return Promise.resolve({
    Body: fileStream
  })
})

jest.mock('@aws-sdk/client-s3', () => {
  const originalModule = jest.requireActual('@aws-sdk/client-s3')
  return {
    ...originalModule,
    S3Client: jest.fn().mockImplementation(() => ({
      destroy: jest.fn(),
      send: mockSend
    }))
  }
})

jest.mock('./image-compression.js', () => ({
  compress: jest.fn().mockResolvedValue({
    file: Buffer.from('A STANDARD TEST BUFFER'),
    start: 0,
    end: 0,
    duration: 0,
    quality: 0,
    manipulations: 0
  })
}))

jest.mock('./pdf-compression.js', () => ({
  compress: jest.fn().mockResolvedValue({
    file: Buffer.from('%PDF-1.4\n...compressed'),
    start: 0,
    end: 0,
    duration: 0,
    reduction: 50,
    size: 1000
  })
}))

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
          confirm_email_before_download: false,
          file: 'QSBTVEFOREFSRCBURVNUIEJVRkZFUg==',
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
})

/**
 * @import { Server } from '@hapi/hapi'
 */
