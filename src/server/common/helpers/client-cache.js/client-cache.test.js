import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'

describe('#clientCacheHelper', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected headers', async () => {
    const { headers, statusCode } = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(headers).toHaveProperty('pragma', 'no-cache')
    expect(headers).toHaveProperty(
      'cache-control',
      'no-store, must-revalidate, max-age=0'
    )
  })

  it('Should skip sending cache headers on error', async () => {
    const { headers, statusCode } = await server.inject({
      method: 'GET',
      url: '/404-error-page'
    })

    expect(statusCode).toBe(statusCodes.notFound)
    expect(headers).not.toHaveProperty('pragma', 'no-cache')
    expect(headers).not.toHaveProperty(
      'cache-control',
      'no-store, must-revalidate, max-age=0'
    )
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
