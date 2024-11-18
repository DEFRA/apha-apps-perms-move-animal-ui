import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import {
  testCsrfProtectedGet,
  testCsrfProtectedPost,
  withCsrfProtection
} from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

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
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/to-or-from-own-premises'
    })

    const document = parseDocument(payload)
    expect(document.title).toBe(
      'Are you moving the cattle on or off your farm?'
    )
    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should process the result and provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/to-or-from-own-premises',
        payload: {
          onOffFarm: 'on'
        }
      })
    )

    expect(parseDocument(payload).title).toBe(
      'Are you moving the cattle on or off your farm?'
    )
    expect(payload).toEqual(expect.not.stringContaining('There is a problem'))

    expect(payload).toEqual(
      expect.stringContaining(
        '<input class="govuk-radios__input" id="off-farm-radio" name="onOffFarm" type="radio" value="off">'
      )
    )

    expect(payload).toEqual(
      expect.stringContaining(
        '<input class="govuk-radios__input" id="on-farm-radio" name="onOffFarm" type="radio" value="on" checked>'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should display an error to the user if no value selected', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/to-or-from-own-premises'
      })
    )

    expect(parseDocument(payload).title).toBe(
      'Error: Are you moving the cattle on or off your farm?'
    )
    expect(payload).toEqual(expect.stringContaining('There is a problem'))

    expect(statusCode).toBe(statusCodes.ok)
  })

  testCsrfProtectedGet(() => server, {
    method: 'GET',
    url: '/to-or-from-own-premises'
  })

  testCsrfProtectedPost(() => server, {
    method: 'POST',
    url: '/to-or-from-own-premises',
    payload: {
      onOffFarm: 'on'
    }
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
