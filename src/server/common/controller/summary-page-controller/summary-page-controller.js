/** @import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js' */
/** @import { StateManager } from '~/src/server/common/model/state/state-manager.js' */
/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */

import { getAuthOptions } from '~/src/server/common/helpers/auth/toggles-helper.js'
import { sectionToSummary } from '~/src/server/common/templates/macros/create-summary.js'
import GenericPageController from '~/src/server/common/controller/generic-page-controller/index.js'

export class SummaryPageController extends GenericPageController {
  /** @type {typeof StateManager} */
  StateManager

  /** @type {string} */
  indexView = 'common/controller/summary-page-controller/index.njk'

  /** @type {string} */
  pageTitle

  /** @type {string} */
  heading

  /** @type {string} */
  taskListUrl

  /**
   * @param {SummaryPage} page
   */
  constructor(page) {
    super(page)
    this.page = page
  }

  get urlPath() {
    return `/${this.page.urlKey ?? this.page.sectionKey}/check-answers`
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name: `${this.StateManager.key}-${this.page.sectionKey}-check-answers`,

        /** @param {Server} server */
        register: (server) => {
          const options = {
            ...getAuthOptions(this.page.skipAuth)
          }
          server.route([
            {
              method: 'GET',
              path: this.urlPath,
              handler: this.getHandler.bind(this),
              options
            },
            {
              method: 'POST',
              path: this.urlPath,
              handler: this.postHandler.bind(this),
              options
            }
          ])
        }
      }
    }
  }

  async handleGet(req, res) {
    const applicationState = new this.StateManager(req).toState()
    const section = this.page.sectionFactory(applicationState)

    const { isValid, firstInvalidPage } = section.validate()
    if (!isValid) {
      return res.redirect(
        `${firstInvalidPage?.urlPath}?redirect_uri=${this.urlPath}`
      )
    }

    return res.view(this.indexView, {
      pageTitle: this.page.pageTitle,
      heading: this.page.pageHeading,
      summary: sectionToSummary(section, this.urlPath)
    })
  }

  handlePost(_req, res) {
    return res.redirect(this.taskListUrl)
  }
}
