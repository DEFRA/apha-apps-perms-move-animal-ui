import { parseDocument } from '../../common/test-helpers/dom.js'
import { createServer } from '~/src/server/index.js'
import { withCsrfProtection } from './csrf.js'
/** @import { Server } from '@hapi/hapi' */

/* global expect, it, beforeAll, afterAll, describe */

/**
 * @param {{description: string, it: string, pageUrl: string }} options
 */
export const describePageSnapshot = ({
  description,
  it: itDescription,
  pageUrl
}) => {
  describe(description, () => {
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
