import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import {
  testCsrfProtectedGet,
  withCsrfProtection
} from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

import { pageTitle } from './controller.js'

describe('#originSummaryController', () => {
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
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'GET',
        url: '/origin/summary'
      })
    )

    const document = parseDocument(payload)
    expect(document.title).toBe(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)
  })

  testCsrfProtectedGet(() => server, {
    method: 'GET',
    url: '/origin/summary'
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
