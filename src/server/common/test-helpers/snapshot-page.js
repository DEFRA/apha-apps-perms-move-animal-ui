import { parseDocument } from '../../common/test-helpers/dom.js'
import { createServer } from '~/src/server/index.js'
import { withCsrfProtection } from './csrf.js'
/** @import { Server } from '@hapi/hapi' */

/* global expect, it, beforeAll, afterAll, describe */

/**
 * @param {{describes: string, it: string, pageUrl: string }} options
 */
export const describePageSnapshot = ({
  describes,
  it: itDescription,
  pageUrl
}) => {
  describe(describes, () => {
    /** @type {Server} */
    let server

    beforeAll(async () => {
      server = await createServer()
      await server.initialize()
    })

    afterAll(async () => {
      await server.stop({ timeout: 0 })
    })

    it(itDescription, async () => {
      const { payload } = await server.inject(
        withCsrfProtection({
          method: 'GET',
          url: pageUrl
        })
      )

      const content =
        parseDocument(payload).querySelector('#main-content')?.innerHTML

      expect(content).toMatchSnapshot()
    })
  })
}
