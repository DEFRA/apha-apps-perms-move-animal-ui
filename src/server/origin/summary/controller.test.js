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

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SesessionTestHelper.create(server)

    await session.setState('origin', {
      onOffFarm: 'off',
      cphNumber: '12/123/1234',
      address: {
        addressLine1: '73 OCEANA CRESCENT',
        addressLine2: 'Archronos Ltd',
        addressTown: 'Basingstoke',
        addressCounty: 'Hampshire',
        addressPostcode: 'RG224FF'
      }
    })
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
  })

  testCsrfProtectedGet(() => server, {
    method: 'GET',
    url: '/origin/summary'
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
