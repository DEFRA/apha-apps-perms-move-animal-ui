import { createServer } from '~/src/server/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'

/**
 * @import { IncomingMessage } from 'node:http'
 * @import { RequestOptions } from '~/src/server/services/httpService.js'
 */

import Wreck from '@hapi/wreck'

jest.spyOn(Wreck, 'post').mockResolvedValue({
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
  })
})
