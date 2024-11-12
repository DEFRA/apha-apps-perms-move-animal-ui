import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'

describe('#onOffFarmController', () => {
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
        onOffFarm: 'on'
      }
    })

    expect(result).toEqual(
      expect.stringContaining(
        'Are you moving the cattle on or off your farm? |'
      )
    )

    expect(result).toEqual(
      expect.stringContaining(
        '<input class="govuk-radios__input" id="off-farm-radio" name="onOffFarm" type="radio" value="off">'
      )
    )

    expect(result).toEqual(
      expect.stringContaining(
        '<input class="govuk-radios__input" id="on-farm-radio" name="onOffFarm" type="radio" value="on" checked>'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should display an error to the user if no value selected', async () => {
    const { result, statusCode } = await server.inject({
      method: 'POST',
      url: '/to-or-from-own-premises',
      payload: {}
    })

    expect(result).toEqual(
      expect.stringContaining(
        'Select if you are moving cattle on or off your farm?'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
