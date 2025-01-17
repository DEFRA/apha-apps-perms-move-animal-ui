import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

describe('#destinationSummaryController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('should render expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/cookies'
    })

    expect(parseDocument(payload).title).toBe('Cookies')
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should render the expected content', async () => {
    const { payload } = await server.inject({
      method: 'GET',
      url: '/cookies'
    })

    const content =
      parseDocument(payload).querySelector('#main-content')?.innerHTML

    expect(content).toMatchSnapshot()
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
