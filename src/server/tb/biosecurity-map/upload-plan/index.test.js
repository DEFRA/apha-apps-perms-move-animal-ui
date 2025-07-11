import { createServer } from '~/src/server/index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import SessionTestHelper from '../../../common/test-helpers/session-helper.js'
import { UploadPlanPage } from './index.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { spyOnConfig } from '../../../common/test-helpers/config.js'
import { initiateFileUpload } from '../../../common/connectors/file-upload/cdp-uploader.js'

/**
 * @import { IncomingMessage } from 'node:http'
 */

const page = new UploadPlanPage()

const testUploadId = 'test-upload-id'
const testUploadUrl = 'test-upload-url'
const testStatusUrl = 'test-status-url'
const testCrumb = 'test-crumb'

const uploadPlanUrl = '/biosecurity-map/upload-plan'
const uploadStatusUrl = '/biosecurity-map/uploading'
const invalidMimeTypeMessage =
  'The selected file must be a BMP, GIF, JPEG, SVG, TIF, WEBP, APNG, AVIF or PDF'

jest.mock('~/src/server/common/connectors/file-upload/cdp-uploader.js', () => ({
  initiateFileUpload: jest.fn().mockResolvedValue({
    res: /** @type {IncomingMessage} */ ({
      statusCode: 200
    }),
    payload: JSON.stringify({
      uploadId: testUploadId,
      uploadUrl: testUploadUrl,
      statusUrl: testStatusUrl
    })
  })
}))
const mockInitiateFileUpload = /** @type {jest.Mock} */ (initiateFileUpload)

describe('#UploadPlan', () => {
  describePageSnapshot({
    describes: '#UploadPlanPage',
    it: 'should render expected response and content',
    pageUrl: uploadPlanUrl
  })

  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('should render expected response and content', async () => {
    spyOnConfig('fileUpload', {
      bucket: 'apha',
      path: 'biosecurity-map'
    })
    const response = await server.inject({
      method: 'GET',
      url: uploadPlanUrl
    })

    expect(response.statusCode).toBe(statusCodes.ok)

    expect(mockInitiateFileUpload).toHaveBeenCalledWith(uploadStatusUrl)
  })

  describe('User revists page', () => {
    let session

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)
    })

    beforeEach(async () => {
      await session.setSectionState(page.sectionKey, {
        [page.questionKey]: {
          metadata: {
            uploadId: testUploadId,
            uploadUrl: testUploadUrl,
            statusUrl: testStatusUrl
          },
          status: {
            uploadStatus: 'ready',
            metadata: {},
            form: {
              crumb: testCrumb,
              nextPage: '',
              file: {
                fileId: '73ee6bac-dfae-4886-b56e-a2658a7905aa',
                filename: '34998B77-FB3E-44DB-BC0E-05154D6549E0.jpeg',
                contentType: 'image/jpeg',
                fileStatus: 'complete',
                contentLength: 374478,
                checksumSha256: '3etoXNlR16WpgCiwylqccFxLVg3OrZvpGUqmigmrhcU=',
                detectedContentType: 'image/jpeg',
                s3Key: 'biosecurity-map/PRESET-key',
                s3Bucket: 'apha'
              }
            }
          }
        }
      })
    })

    it('should retain the original file if user doesnt interact with file upload', async () => {
      await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: uploadPlanUrl
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(mockInitiateFileUpload).toHaveBeenCalled()

      const section = await session.getSectionState(page.sectionKey)
      expect(section[page.questionKey].status.form.file.s3Key).toBe(
        'biosecurity-map/PRESET-key'
      )
    })
  })

  describe('#errors', () => {
    let session

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)
    })

    describe('empty file', () => {
      beforeEach(async () => {
        await session.setSectionState(page.sectionKey, {
          [page.questionKey]: {
            metadata: {
              uploadId: testUploadId,
              uploadUrl: testUploadUrl,
              statusUrl: testStatusUrl
            },
            status: {
              uploadStatus: 'ready',
              metadata: {},
              form: {
                crumb: testCrumb,
                nextPage: ''
              }
            }
          }
        })
      })

      it('should render expected response and content', async () => {
        const { payload } = await server.inject(
          withCsrfProtection(
            {
              method: 'GET',
              url: uploadPlanUrl
            },
            {
              Cookie: session.sessionID
            }
          )
        )

        expect(payload).toContain('You need to upload your biosecurity map')
      })
    })

    describe('invalid mimetype', () => {
      beforeEach(async () => {
        await session.setSectionState(page.sectionKey, {
          [page.questionKey]: {
            metadata: {
              uploadId: testUploadId,
              uploadUrl: testUploadUrl,
              statusUrl: testStatusUrl
            },
            status: {
              uploadStatus: 'ready',
              metadata: {},
              form: {
                crumb: testCrumb,
                nextPage: '',
                file: {
                  fileId: 'file-id',
                  filename: 'INVALID MIME TYPE TEST',
                  contentType: 'application/octet-stream',
                  fileStatus: 'rejected',
                  contentLength: 8,
                  hasError: true,
                  errorMessage: invalidMimeTypeMessage
                }
              },
              numberOfRejectedFiles: 1
            }
          }
        })
      })

      it('should render expected response and content', async () => {
        const { payload } = await server.inject(
          withCsrfProtection(
            {
              method: 'GET',
              url: uploadPlanUrl
            },
            {
              Cookie: session.sessionID
            }
          )
        )

        expect(payload).toContain(invalidMimeTypeMessage)
      })
    })
  })
})
