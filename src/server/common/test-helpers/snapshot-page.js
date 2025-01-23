import { parseDocument } from '../../common/test-helpers/dom.js'
import { createServer } from '~/src/server/index.js'
import { withCsrfProtection } from './csrf.js'
/** @import { Server } from '@hapi/hapi' */

/* global expect, it, beforeAll, afterAll, describe */

/**
 * @param {string} describeMessage
 * @param {string} shouldMessage
 * @param {string} urlPath
 */
export const describePageSnapshot = (
  describeMessage,
  shouldMessage,
  urlPath
) => {
  describe(describeMessage, () => {
    /** @type {Server} */
    let server

    beforeAll(async () => {
      server = await createServer()
      await server.initialize()
    })

    afterAll(async () => {
      await server.stop({ timeout: 0 })
    })

    it(shouldMessage, async () => {
      const { payload } = await server.inject(
        withCsrfProtection({
          method: 'GET',
          url: urlPath
        })
      )

      const content =
        parseDocument(payload).querySelector('#main-content')?.innerHTML

      expect(content).toMatchSnapshot()
    })
  })
}
