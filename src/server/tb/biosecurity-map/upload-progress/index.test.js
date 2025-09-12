import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import SessionTestHelper from '../../../common/test-helpers/session-helper.js'
import { uploadConfig } from '../upload-config.js'
import { checkStatus } from '../../../common/connectors/file-upload/cdp-uploader.js'
import { uploadProgressPage } from './index.js'

/**
 * @import { IncomingMessage } from 'node:http'
 */

const testUploadId = 'test-upload-id'
const testUploadUrl = 'test-upload-url'
const testStatusUrl = 'test-status-url'
const testCrumb = 'test-crumb'

const uploadProgressUrl = '/biosecurity-map/uploading'
const checkAnswersUrl = '/biosecurity-map/check-answers'
const uploadPlanUrl = '/biosecurity-map/upload-plan'

jest.mock('~/src/server/common/connectors/file-upload/cdp-uploader.js', () => ({
  checkStatus: jest.fn()
}))
const mockCheckStatus = /** @type {jest.Mock} */ (checkStatus)

// Mock logger
const mockLoggerError = jest.fn()
jest.mock('hapi-pino', () => ({
  register: (server) => {
    // Decorate server with logger
    server.decorate('server', 'logger', {
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn()
    })
    // Decorate request with logger
    server.decorate('request', 'logger', {
      error: mockLoggerError,
      info: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn()
    })
  },
  name: 'hapi-pino'
}))

describe('#UploadPlan', () => {
  let server
  let session

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)
    await session.setSectionState(uploadConfig.questionKey, {
      statusUrl: 'http://localhost/status'
    })
  })

  beforeEach(async () => {
    await session.setSectionState(uploadConfig.sectionKey, {
      [uploadConfig.questionKey]: {
        metadata: {
          uploadId: testUploadId,
          uploadUrl: testUploadUrl,
          statusUrl: testStatusUrl
        }
      }
    })
  })

  beforeEach(() => {
    // Reset logger mock before each test
    mockLoggerError.mockClear()
  })

  describe('valid upload', () => {
    beforeEach(() => {
      mockCheckStatus.mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: statusCodes.ok
        }),
        payload: JSON.stringify({
          uploadStatus: 'ready',
          metadata: {},
          form: {
            crumb: testCrumb,
            nextPage: '',
            file: {
              fileId: 'file-id',
              filename: 'file-name.jpeg',
              contentType: 'image/jpeg',
              fileStatus: 'complete',
              contentLength: 374478,
              checksumSha256: 'some-checksum',
              detectedContentType: 'image/jpeg',
              s3Key: 'biosecurity-map/some-key',
              s3Bucket: 'apha'
            }
          },
          numberOfRejectedFiles: 0
        })
      })
    })

    describePageSnapshot({
      describes: '#UploadProgressPage',
      it: 'should render expected response and content',
      pageUrl: uploadProgressUrl
    })

    it('should render the upload progress page', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: uploadProgressUrl,
        headers: {
          Cookie: session.sessionID
        }
      })

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(checkAnswersUrl)
    })
  })

  describe('missing file', () => {
    beforeEach(() => {
      mockCheckStatus.mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: statusCodes.ok
        }),
        payload: JSON.stringify({
          uploadStatus: 'ready',
          metadata: {},
          form: {
            crumb: testCrumb,
            nextPage: ''
          }
        })
      })
    })

    it('should redirect to the upload page', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: uploadProgressUrl,
        headers: {
          Cookie: session.sessionID
        }
      })

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(uploadPlanUrl)
    })
  })

  describe('invalid file type', () => {
    beforeEach(() => {
      mockCheckStatus.mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: statusCodes.ok
        }),
        payload: JSON.stringify({
          uploadStatus: 'ready',
          metadata: {},
          numberOfRejectedFiles: 1,
          form: {
            crumb: testCrumb,
            nextPage: '',
            file: {
              errorMessage: 'test'
            }
          }
        })
      })
    })

    it('should output the new error to logger', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: uploadProgressUrl,
        headers: {
          Cookie: session.sessionID
        }
      })

      expect(mockLoggerError).toHaveBeenCalledWith(
        `User encountered a validation error on /biosecurity-map/upload-map, on the ${uploadProgressPage.questionKey} field: test`
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(uploadPlanUrl)
    })
  })
})
