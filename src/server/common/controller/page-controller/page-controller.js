import { calculateNextPage } from '../../helpers/next-page.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
/** @import { Server, ServerRegisterPluginObject, ServerRoute, ReqRefDefaults, RouteDefMethods } from '@hapi/hapi' */
/** @import { NextPage } from '../../helpers/next-page.js' */
/** @import { RawPayload } from '../../model/answer/answer-model.js' */
/** @import { Page } from '../../model/page/page-model.js' */

/**
 * @typedef {{
 *   methods: RouteDefMethods[]
 * }} ControllerOptions
 */

/** @type {ControllerOptions} */
const defaultControllerOptions = {
  methods: ['GET', 'POST']
}

export class PageController {
  options
  /**
   * @param {Page} page
   * @param {ControllerOptions} opts
   */
  constructor(page, opts = defaultControllerOptions) {
    this.page = page

    this.options = opts
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    /** @type {ServerRoute<ReqRefDefaults>[]} */
    const handlers = this.options.methods.map((method) => {
      return {
        method,
        path: this.page.urlPath,
        handler: this[`${method.toLowerCase()}Handler`].bind(this)
      }
    })

    return {
      plugin: {
        name: `${this.page.sectionKey}-${this.page.key}`,

        /** @param {Server} server */
        register: (server) => {
          server.route(handlers)
        }
      }
    }
  }

  getHandler(req, h) {
    return h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle: this.page.title,
      heading: this.page.heading,
      hideQuestion: true,
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
