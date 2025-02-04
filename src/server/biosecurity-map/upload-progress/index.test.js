import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import Wreck from '@hapi/wreck'

/**
 * @import { IncomingMessage } from 'node:http'
 */

jest.spyOn(Wreck, 'get').mockResolvedValue({
  res: /** @type {IncomingMessage} */ ({
    statusCode: statusCodes.ok
  }),
  payload: JSON.stringify({
    uploadStatus: 'pending'
  })
})

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
    await session.setState('upload', {
      statusUrl: 'http://localhost/status'
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
