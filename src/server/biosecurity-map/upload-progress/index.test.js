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

  describe('virus scan pending', () => {
    beforeEach(() => {
      jest.spyOn(Wreck, 'get').mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: statusCodes.ok
        }),
        payload: JSON.stringify({
          uploadStatus: 'pending'
        })
      })
    })

    it('should render expected response and content', async () => {
      const { statusCode, payload } = await server.inject({
        method: 'GET',
        url: '/biosecurity-map/uploading',
        headers: {
          Cookie: session.sessionID
        }
      })

      expect(statusCode).toBe(statusCodes.ok)

      expect(payload).toContain('<meta http-equiv="refresh" content="5" />')
      expect(payload).toContain('Uploading the biosecurity map')
    })
  })

  describe('virus scan complete', () => {
    beforeEach(() => {
      jest.spyOn(Wreck, 'get').mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: statusCodes.ok
        }),
        payload: JSON.stringify({
          uploadStatus: 'ready'
        })
      })
    })

    it('should redirect to the next page', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/biosecurity-map/uploading',
        headers: {
          Cookie: session.sessionID
        }
      })

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe('/biosecurity/check-answers')
    })
  })
})
