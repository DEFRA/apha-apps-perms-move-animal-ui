import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import Wreck from '@hapi/wreck'
import { uploadConfig } from '../upload-config.js'

/**
 * @import { IncomingMessage } from 'node:http'
 */

describe('#UploadPlan', () => {
  describePageSnapshot({
    describes: '#UploadProgressPage',
    it: 'should render expected response and content',
    pageUrl: '/biosecurity-map/uploading'
  })

  let server
  let session

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)
    await session.setState(uploadConfig.questionKey, {
      statusUrl: 'http://localhost/status'
    })
  })

  describe('missing file', () => {
    beforeEach(() => {
      session.setState(uploadConfig.questionKey, {
        metadata: {
          uploadId: '462b24f2-f9ef-4bde-a826-6ae00b87b32c',
          uploadUrl:
            'http://localhost:7337/upload-and-scan/462b24f2-f9ef-4bde-a826-6ae00b87b32c',
          statusUrl:
            'http://localhost:7337/status/462b24f2-f9ef-4bde-a826-6ae00b87b32c'
        }
      })
    })

    beforeEach(() => {
      jest.spyOn(Wreck, 'get').mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: statusCodes.ok
        }),
        payload: JSON.stringify({
          uploadStatus: 'ready',
          metadata: {},
          form: {
            crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
            nextPage: ''
          }
        })
      })
    })

    it('should redirect to the upload page', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/biosecurity-map/uploading',
        headers: {
          Cookie: session.sessionID
        }
      })

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe('/biosecurity-map/upload-plan')
    })
  })
})
