import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { postLogout } from './index.js'

const pageUrl = '/auth/post-logout'

describe('#postLogoutController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()

    await server.register([postLogout])
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { headers, statusCode } = await server.inject({
      method: 'GET',
      url: pageUrl
    })

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/')
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
