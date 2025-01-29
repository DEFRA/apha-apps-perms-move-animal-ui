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
  const PROCESS_ENV = process.env

  describe(describes, () => {
    /** @type {Server} */
    let server

    beforeAll(async () => {
      process.env = { ...PROCESS_ENV }
      // set the feature flags to allow the actual pages to be rendered
      process.env.BIOSECURITY_FEATURE_ENABLED = 'true'

      server = await createServer()
      await server.initialize()
    })

    afterAll(async () => {
      await server.stop({ timeout: 0 })
      process.env = PROCESS_ENV
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
