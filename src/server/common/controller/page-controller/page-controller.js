import { calculateNextPage } from '../../helpers/next-page.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import GenericPageController from '../generic-page-controller/index.js'
import { getAuthOptions } from '../../helpers/auth/toggles-helper.js'

/** @import { Server, ServerRegisterPluginObject, ServerRoute, ReqRefDefaults, RouteDefMethods } from '@hapi/hapi' */
/** @import { NextPage } from '../../helpers/next-page.js' */
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

/**
 * @satisfies {PageController}
 */
export class PageController extends GenericPageController {
  options
  /**
   * @param {Page} page
   * @param {ControllerOptions} opts
   */
  constructor(page, opts = defaultControllerOptions) {
    super(page)
    this.page = page

    this.options = opts
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    /** @type {ServerRoute<ReqRefDefaults>[]} */
    const handlers = this.options.methods.map((method) => {
      const handler = {
        method,
        path: this.page.urlPath,
        handler: this[`${method.toLowerCase()}Handler`].bind(this)
      }
      const authOptions = getAuthOptions(this.page.skipAuth)

      if (authOptions) {
        handler.options = { ...authOptions }
      }
      return handler
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

  handleGet(req, h, opts = {}) {
    const response = h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle: this.page.title,
      heading: this.page.heading,
      ...this.page.viewProps(req),
      ...opts
    })

    if (this.page instanceof ExitPage) {
      response.header('X-Exit-Page', `true; ${this.page.urlPath}`)
    }

    return response
  }

  handlePost(req, h) {
    const payload = /** @type {NextPage} */ (req.payload)
    const nextPage = this.page.nextPage()

    if (nextPage instanceof ExitPage) {
      return h.redirect(nextPage.urlPath)
    } else {
      return h.redirect(calculateNextPage(payload.nextPage, nextPage.urlPath))
    }
  }
}
