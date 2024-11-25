import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import {
  testCsrfProtectedGet,
  withCsrfProtection
} from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

import { pageTitle } from './controller.js'
import SesessionTestHelper from '../../common/test-helpers/session-helper.js'

describe('#originSummaryController', () => {
  /** @type {Server} */
  let server
  let session

  /** @type {SesessionTestHelper} */
  let session

  const defaultState = {
    onOffFarm: 'off',
    cphNumber: '12/123/1234',
    address: {
      addressLine1: 'Starfleet Headquarters',
      addressLine2: '24-593 Federation Drive',
      addressTown: 'San Francisco',
      addressCounty: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    }
  }

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SesessionTestHelper.create(server)

    await session.setState('origin', defaultState)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/origin/summary'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(document.title).toBe(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)

    expect(payload).toEqual(expect.stringContaining('12/123/1234'))
    expect(payload).toEqual(expect.stringContaining('Off the farm or premises'))
    expect(payload).toEqual(
      expect.stringContaining(
        Object.values(defaultState.address).join('<br />')
      )
    )
  })

  describe('should exclude specific fields when missing from state', () => {
    it('should not show on/off farm text', async () => {
      await session.setState('origin', {
        ...defaultState,
        onOffFarm: undefined
      })

      const { payload } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/origin/summary'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(payload).not.toEqual(
        expect.stringContaining('On to the farm or premises')
      )
      expect(payload).not.toEqual(
        expect.stringContaining('Off the farm or premises')
      )

      expect(payload).toEqual(expect.stringContaining('12/123/1234'))
      expect(payload).toEqual(
        expect.stringContaining(
          Object.values(defaultState.address).join('<br />')
        )
      )
    })

    it('should not show address text', async () => {
      await session.setState('origin', {
        ...defaultState,
        address: undefined
      })

      const { payload } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/origin/summary'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(payload).toEqual(
        expect.stringContaining('Off the farm or premises')
      )

      expect(payload).toEqual(expect.stringContaining('12/123/1234'))

      expect(payload).not.toEqual(
        expect.stringContaining(
          Object.values(defaultState.address).join('<br />')
        )
      )
    })

    it('should not show cph number', async () => {
      await session.setState('origin', {
        ...defaultState,
        cphNumber: undefined
      })

      const { payload } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/origin/summary'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(payload).toEqual(
        expect.stringContaining('Off the farm or premises')
      )

      expect(payload).not.toEqual(expect.stringContaining('12/123/1234'))

      expect(payload).toEqual(
        expect.stringContaining(
          Object.values(defaultState.address).join('<br />')
        )
      )
    })
  })

  testCsrfProtectedGet(() => server, {
    method: 'GET',
    url: '/origin/summary'
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
