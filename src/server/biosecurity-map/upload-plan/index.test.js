import { createServer } from '~/src/server/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import Wreck from '@hapi/wreck'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { UploadPlanPage } from './index.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'

const page = new UploadPlanPage()

/**
 * @import { IncomingMessage } from 'node:http'
 */

const wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
  res: /** @type {IncomingMessage} */ ({
    statusCode: statusCodes.ok
  }),
  payload: JSON.stringify({
    uploadId: 'b18ceadb-afb1-4955-a70b-256bf94444d5',
    uploadUrl: '/upload-and-scan/b18ceadb-afb1-4955-a70b-256bf94444d5',
    statusUrl:
      'https://cdp-uploader/status/b18ceadb-afb1-4955-a70b-256bf94444d5'
  })
})

describe('#UploadPlan', () => {
  describePageSnapshot({
    describes: '#UploadPlanPage',
    it: 'should render expected response and content',
    pageUrl: '/biosecurity-map/upload-plan'
  })

  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  it('should render expected response and content', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/biosecurity-map/upload-plan'
    })

    expect(response.statusCode).toBe(statusCodes.ok)

    expect(wreckSpy).toHaveBeenCalledWith(expect.any(String), {
      payload: JSON.stringify({
        redirect: page.nextPage().urlPath,
        s3Bucket: 'apha',
        s3Path: 'biosecurity-map',
        mimeTypes: ['image/png', 'image/jpeg', 'application/pdf'],
        maxFileSize: 10_1000_1000
      })
    })
  })

  describe('#errors', () => {
    let session

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)
    })

    describe('empty file', () => {
      beforeEach(async () => {
        await session.setState(page.sectionKey, {
          [page.questionKey]: {
            metadata: {
              uploadId: '843ed89f-247d-4c3e-a2f0-f31afbb289b2',
              uploadUrl:
                'http://localhost:7337/upload-and-scan/843ed89f-247d-4c3e-a2f0-f31afbb289b2',
              statusUrl:
                'http://localhost:7337/status/843ed89f-247d-4c3e-a2f0-f31afbb289b2'
            },
            status: {
              uploadStatus: 'ready',
              metadata: {},
              form: {
                crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
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
              url: '/biosecurity-map/upload-plan'
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
        await session.setState(page.sectionKey, {
          [page.questionKey]: {
            metadata: {
              uploadId: '71f8a17e-0507-4a3b-b8d2-7b5d7a67852c',
              uploadUrl:
                'http://localhost:7337/upload-and-scan/71f8a17e-0507-4a3b-b8d2-7b5d7a67852c',
              statusUrl:
                'http://localhost:7337/status/71f8a17e-0507-4a3b-b8d2-7b5d7a67852c'
            },
            status: {
              uploadStatus: 'ready',
              metadata: {},
              form: {
                crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
                nextPage: '',
                file: {
                  fileId: 'c02acd86-c858-4221-a971-9e00bfdb1ff1',
                  filename: 'INVALID MIME TYPE TEST',
                  contentType: 'application/octet-stream',
                  fileStatus: 'rejected',
                  contentLength: 8,
                  hasError: true,
                  errorMessage:
                    'The selected file must be a BMP, GIF, JPEG, SVG, TIF, WEBP, APNG, AVIF or PDF'
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
              url: '/biosecurity-map/upload-plan'
            },
            {
              Cookie: session.sessionID
            }
          )
        )

        expect(payload).toContain(
          'The selected file must be a BMP, GIF, JPEG, SVG, TIF, WEBP, APNG, AVIF or PDF'
        )
      })
    })
  })
})
