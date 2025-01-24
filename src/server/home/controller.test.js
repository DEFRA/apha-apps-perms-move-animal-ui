import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { config } from '~/src/config/config.js'
import { describePageSnapshot } from '../common/test-helpers/snapshot-page.js'

const pageUrl = '/'

describe('#homeController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: pageUrl
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(parseDocument(payload).title).toBe(config.get('serviceName'))
  })

  describePageSnapshot({
    describes: 'homeController.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
