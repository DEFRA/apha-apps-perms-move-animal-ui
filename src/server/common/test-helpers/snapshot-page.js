import { parseDocument } from '../../common/test-helpers/dom.js'
import { createServer } from '~/src/server/index.js'
import { withCsrfProtection } from './csrf.js'
import SessionTestHelper from './session-helper.js'

/** @import { Server } from '@hapi/hapi' */

/* global expect, it, beforeAll, beforeEach, afterAll, describe */

/**
 * @param {{describes: string, it: string, pageUrl: string, state?: any; rawState?: any }} options
 */
export const describePageSnapshot = ({
  describes,
  it: itDescription,
  pageUrl,
  state = {},
  rawState = {}
}) => {
  describe(describes, () => {
    /** @type {Server} */
    let server
    let session

    beforeAll(async () => {
      server = await createServer()
      await server.initialize()
    })
    beforeEach(async () => {
      session = await SessionTestHelper.create(server)

      for (const [key, value] of Object.entries(state)) {
        await session.setSectionState(key, value)
      }

      for (const [key, value] of Object.entries(rawState)) {
        await session.setState(key, value)
      }
    })

    afterAll(async () => {
      await server.stop({ timeout: 0 })
    })

    it(itDescription, async () => {
      const { payload } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: pageUrl
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      const content =
        parseDocument(payload).querySelector('#main-content')?.innerHTML

      expect(content).toMatchSnapshot()
    })
  })
}
