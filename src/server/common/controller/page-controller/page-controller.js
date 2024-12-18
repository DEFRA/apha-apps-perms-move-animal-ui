import { calculateNextPage } from '../../helpers/next-page.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { NextPage } from '../../helpers/next-page.js' */
/** @import { RawPayload } from '../../model/answer/answer-model.js' */
/** @import { Page } from '../../model/page/page-model.js' */

export class PageController {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name: `${this.page.sectionKey}-${this.page.key}`,

        /** @param {Server} server */
        register: (server) => {
          server.route([
            {
              method: 'GET',
              path: this.page.urlPath,
              handler: this.getHandler.bind(this)
            },
            {
              method: 'POST',
              path: this.page.urlPath,
              handler: this.postHandler.bind(this)
            }
          ])
        }
      }
    }
  }

  getHandler(req, h) {
    return h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle: this.page.title,
      heading: this.page.heading,
      ...this.page.viewProps
    })
  }

  postHandler(req, h) {
    const payload = /** @type {NextPage} */ (req.payload)
    const nextPage = this.page.nextPage()

    if (nextPage instanceof ExitPage) {
      return h.redirect(nextPage.urlPath)
    } else {
      return h.redirect(calculateNextPage(payload.nextPage, nextPage.urlPath))
    }
  }
}
