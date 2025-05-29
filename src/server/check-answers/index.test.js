import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../common/test-helpers/session-helper.js'
import {
  sendEmailToApplicant,
  sendEmailToCaseWorker
} from '../common/connectors/notify/notify.js'
import { validApplicationState } from '../common/test-helpers/journey-state.js'
import { spyOnConfig } from '../common/test-helpers/config.js'
import { handleUploadedFile } from '../common/helpers/file/file-utils.js'
import { sizeErrorPage } from '../biosecurity-map/size-error/index.js'

const testFile = 'test_file'
const testFileBase64 = 'dGVzdF9maWxl'

// Mock the handleUploadedFile function
jest.mock('../common/helpers/file/file-utils.js', () => ({
  handleUploadedFile: jest.fn().mockResolvedValue({
    file: Buffer.from(testFile),
    extension: 'pdf'
  })
}))
const mockHandleUploadedFile = /** @type {jest.Mock} */ (handleUploadedFile)

jest.mock('../common/connectors/notify/notify.js', () => ({
  sendEmailToApplicant: jest.fn(),
  sendEmailToCaseWorker: jest.fn()
}))
const mockSendEmailToApplicant = /** @type {jest.Mock} */ (sendEmailToApplicant)
const mockSendEmailToCaseWorker = /** @type {jest.Mock} */ (
  sendEmailToCaseWorker
)

jest.mock('../common/helpers/application-reference/index.js', () => ({
  getApplicationReference: jest.fn().mockReturnValue('TB-XXXX-XXXX')
}))

const {
  origin,
  destination,
  licence,
  identification,
  biosecurity,
  'biosecurity-map': biosecurityMap
} = validApplicationState
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

  it('Should redirect to task-incomplete page if not all answers valid', async () => {
    await session.setSectionState('origin', {})
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

  describe('when email confirmation to the applicant is disabled', () => {
    beforeEach(() => {
      spyOnConfig('featureFlags', {
        emailConfirmation: false
      })
    })

    it('should not send an email on POST and display an error if a declaration is missing', async () => {
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

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(checkAnswersUri)

      const { payload } = await server.inject(
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

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
      expect(payload).toEqual(
        expect.stringContaining(
          '<a href="#confirmation">You need to tick a declaration box</a>'
        )
      )

      expect(sendEmailToCaseWorker).not.toHaveBeenCalled()
    })

    it('should not send an email and redirect to task incomplete on POST if application is invalid', async () => {
      await session.setSectionState('origin', {})
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

      expect(sendEmailToCaseWorker).not.toHaveBeenCalled()
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(taskListIncompleteUri)
    })

    it('should error if email to case worker fails to send for whatever reason', async () => {
      mockSendEmailToCaseWorker.mockImplementationOnce(() => {
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]

      expect(content).toMatchSnapshot('email-content')
      expect(sendEmailToCaseWorker).toHaveBeenCalledTimes(1)
      expect(statusCode).toBe(statusCodes.serverError)
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]

      expect(content).toMatchSnapshot('email-content')
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(confirmationUri)
    })

    it('Should send email and redirect correctly when only `confirm` present', async () => {
      spyOnConfig('notify', {
        fileRetention: '1 week',
        confirmDownloadConfirmation: true
      })
      spyOnConfig('featureFlags', {
        sendToCaseManagement: false,
        emailConfirmation: true
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]

      expect(content).toMatchSnapshot('email-content')
      expect(mockSendEmailToCaseWorker).toHaveBeenCalledTimes(1)
      expect(mockSendEmailToCaseWorker).toHaveBeenCalledWith(
        expect.objectContaining({
          link_to_file: {
            confirm_email_before_download: true,
            file: testFileBase64,
            filename: 'Biosecurity-map.pdf',
            retention_period: '1 week'
          }
        })
      )
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]

      expect(content).toMatchSnapshot('email-content')
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(confirmationUri)
    })

    it('should send email in correct format', async () => {
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]

      expect(statusCode).toBe(statusCodes.redirect)
      expect(content).toMatchSnapshot('email-content')
    })

    it('should handle the file and send email in correct format', async () => {
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

    it('should compress the file and redirect to size error page if the file is too large', async () => {
      mockHandleUploadedFile.mockResolvedValueOnce({
        file: Buffer.alloc(3 * 1024 * 1024),
        extension: 'jpg'
      })

      const { statusCode, headers } = await server.inject(
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
      expect(headers.location).toBe(sizeErrorPage.urlPath)
    })

    it('should not handle the file and send email in correct format if the file status is already "skipped"', async () => {
      const uploadPlan = biosecurityMap['upload-plan']

      await session.setSectionState('biosecurity-map', {
        ...biosecurityMap,
        ...{
          'upload-plan': {
            ...uploadPlan,
            status: {
              ...uploadPlan.status,
              uploadStatus: 'skipped'
            }
          }
        }
      })

      const { statusCode, headers } = await server.inject(
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

      expect(handleUploadedFile).not.toHaveBeenCalled()
      expect(statusCode).toBe(statusCodes.redirect)
      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(confirmationUri)
    })
  })

  describe('when email confirmation to the applicant is enabled', () => {
    const expectedApplicantEmailParams = {
      email: 'kathryn@starfleet.com',
      fullName: 'Kathryn Janeway',
      reference: 'TB-XXXX-XXXX'
    }

    beforeEach(() => {
      spyOnConfig('featureFlags', {
        emailConfirmation: true
      })
    })

    it('should not send an email on POST and display an error if a declaration is missing', async () => {
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

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(checkAnswersUri)

      const { payload } = await server.inject(
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

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
      expect(payload).toEqual(
        expect.stringContaining(
          '<a href="#confirmation">You need to tick a declaration box</a>'
        )
      )

      expect(sendEmailToCaseWorker).not.toHaveBeenCalled()
      expect(sendEmailToApplicant).not.toHaveBeenCalled()
    })

    it('should not send an email and redirect to task incomplete on POST if application is invalid', async () => {
      await session.setSectionState('origin', {})
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

      expect(sendEmailToCaseWorker).not.toHaveBeenCalled()
      expect(sendEmailToApplicant).not.toHaveBeenCalled()
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(taskListIncompleteUri)
    })

    it('should error if email to case worker fails to send for whatever reason and not send email to applicant', async () => {
      mockSendEmailToCaseWorker.mockImplementationOnce(() => {
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')

      expect(sendEmailToCaseWorker).toHaveBeenCalledTimes(1)
      expect(sendEmailToApplicant).not.toHaveBeenCalled()
      expect(statusCode).toBe(statusCodes.serverError)
    })

    it('should error if email to applicant fails to send for whatever reason', async () => {
      mockSendEmailToApplicant.mockImplementationOnce(() => {
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

      expect(sendEmailToCaseWorker).toHaveBeenCalledTimes(1)
      expect(sendEmailToApplicant).toHaveBeenCalledTimes(1)
      expect(statusCode).toBe(statusCodes.serverError)
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')
      expect(mockSendEmailToApplicant).toHaveBeenCalledWith(
        expectedApplicantEmailParams
      )
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(confirmationUri)
    })

    it('Should send emails and redirect correctly when only `confirm` present', async () => {
      spyOnConfig('notify', {
        fileRetention: '1 week',
        confirmDownloadConfirmation: true
      })
      spyOnConfig('featureFlags', {
        sendToCaseManagement: false,
        emailConfirmation: true
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')

      expect(mockSendEmailToCaseWorker).toHaveBeenCalledTimes(1)
      expect(mockSendEmailToCaseWorker).toHaveBeenCalledWith(
        expect.objectContaining({
          link_to_file: {
            confirm_email_before_download: true,
            file: testFileBase64,
            filename: 'Biosecurity-map.pdf',
            retention_period: '1 week'
          }
        })
      )
      expect(mockSendEmailToApplicant).toHaveBeenCalledTimes(1)
      expect(mockSendEmailToApplicant).toHaveBeenCalledWith(
        expectedApplicantEmailParams
      )
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(confirmationUri)
    })

    it('Should send emails and redirect correctly when only `other` present', async () => {
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')
      expect(mockSendEmailToApplicant).toHaveBeenCalledTimes(1)
      expect(mockSendEmailToApplicant).toHaveBeenCalledWith(
        expectedApplicantEmailParams
      )
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(confirmationUri)
    })

    it('should send emails in correct format', async () => {
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')
      expect(mockSendEmailToApplicant).toHaveBeenCalledTimes(1)
      expect(mockSendEmailToApplicant).toHaveBeenCalledWith(
        expectedApplicantEmailParams
      )
      expect(statusCode).toBe(statusCodes.redirect)
    })

    it('should handle the file and send email in correct format', async () => {
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

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')
      expect(mockSendEmailToApplicant).toHaveBeenCalledTimes(1)
      expect(mockSendEmailToApplicant).toHaveBeenCalledWith(
        expectedApplicantEmailParams
      )
    })

    it('should compress the file and redirect to size error page if the file is too large', async () => {
      mockHandleUploadedFile.mockResolvedValueOnce({
        file: Buffer.alloc(3 * 1024 * 1024),
        extension: 'jpg'
      })

      const { statusCode, headers } = await server.inject(
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
      expect(headers.location).toBe(sizeErrorPage.urlPath)
      expect(sendEmailToCaseWorker).not.toHaveBeenCalled()
      expect(sendEmailToApplicant).not.toHaveBeenCalled()
    })

    it('should not handle the file and send email in correct format if the file status is already "skipped"', async () => {
      const uploadPlan = biosecurityMap['upload-plan']

      await session.setSectionState('biosecurity-map', {
        ...biosecurityMap,
        ...{
          'upload-plan': {
            ...uploadPlan,
            status: {
              ...uploadPlan.status,
              uploadStatus: 'skipped'
            }
          }
        }
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

      expect(handleUploadedFile).not.toHaveBeenCalled()
      expect(statusCode).toBe(statusCodes.redirect)

      const [{ content }] = mockSendEmailToCaseWorker.mock.calls[0]
      expect(content).toMatchSnapshot('email-content')
      expect(mockSendEmailToApplicant).toHaveBeenCalledTimes(1)
      expect(mockSendEmailToApplicant).toHaveBeenCalledWith(
        expectedApplicantEmailParams
      )
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
