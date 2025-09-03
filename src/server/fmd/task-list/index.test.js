import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { FmdApplicationModel } from '../application.js'
import { FmdStateManager } from '../state-manager.js'
import { FmdTaskListController } from './index.js'
import { createServer } from '../../index.js'
import { withCsrfProtection } from '../../common/test-helpers/csrf.js'
import { parseDocument } from '../../common/test-helpers/dom.js'
import { spyOnConfig } from '../../common/test-helpers/config.js'

/** @import { Server } from '@hapi/hapi' */

describe('FmdTaskListController', () => {
  const controller = new FmdTaskListController()

  it('should have the right title', () => {
    expect(controller.pageTitleAndHeading).toBe(
      'Your foot and mouth disease movement licence application'
    )
  })

  it('should contain the right application model', () => {
    expect(controller.ApplicationModel).toBe(FmdApplicationModel)
  })

  it('should contain the state manager', () => {
    expect(controller.StateManager).toBe(FmdStateManager)
  })

  it('should have the right url path', () => {
    expect(controller.urlPath).toBe('/fmd/task-list')
  })

  it('should have the right submit url path', () => {
    expect(controller.submitUrlPath).toBe('/fmd/submit/check-answers')
  })

  describePageSnapshot({
    describes: 'FmdTaskListController',
    it: 'should have the expected content',
    pageUrl: controller.urlPath
  })

  describe('task list banner', () => {
    /** @type {Server} */
    let server

    beforeAll(async () => {
      server = await createServer()
      await server.initialize()
    })

    afterAll(async () => {
      await server.stop({ timeout: 0 })
    })

    it('should have the right banner (in protype mode)', async () => {
      spyOnConfig('featureFlags', {
        prototypeMode: true
      })

      const { payload } = await server.inject(
        withCsrfProtection({
          method: 'GET',
          url: controller.urlPath
        })
      )

      const contentTag = parseDocument(payload)
        .querySelector('.govuk-phase-banner__content__tag')
        ?.innerHTML.trim()
      const text = parseDocument(payload)
        .querySelector('.govuk-phase-banner__text')
        ?.innerHTML.trim()

      expect(contentTag).toBe('Prototype')
      expect(text).toBe('This is a service prototype.')
    })
  })
})
