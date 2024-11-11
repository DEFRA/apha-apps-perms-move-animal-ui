import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'

describe('#xController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/to-or-from-own-premises'
    })

    expect(result).toEqual(
      expect.stringContaining(
        'Are you moving the cattle on or off your farm? |'
      )
    )
    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should process the result and provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'POST',
      url: '/to-or-from-own-premises',
      payload: {
        toFromFarm: 'on'
      }
    })

    expect(result).toEqual(
      expect.stringContaining(
        'Are you moving the cattle on or off your farm? |'
      )
    )

    expect(result).toEqual(
      expect.stringContaining(
        '<input class="govuk-radios__input" id="toFromFarm" name="toFromFarm" type="radio" value="on" checked>'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
