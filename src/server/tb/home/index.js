/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'
import { Page } from '~/src/server/common/model/page/page-model.js'
import { config } from '~/src/config/config.js'

export class HomePage extends Page {
  skipAuth = true
  key = 'home'
  sectionKey = 'tb'
  view = 'tb/home/index.njk'
  urlPath = '/'
  pageTitle = config.get('serviceName')
  pageHeading = 'Move animals under disease controls'
}

export const homePage = new HomePage()

class HomePageController extends PageController {
  async getHandler(req, h) {
    const serviceGovUkDomain = config.get('homepage.serviceGovUkDomain')
    const serviceGovUkRedirectUrl = config.get(
      'homepage.serviceGovUkRedirectUrl'
    )

    if (serviceGovUkDomain && serviceGovUkRedirectUrl) {
      const host = req.headers.host
      const requestHost = Array.isArray(host) ? host[0] : host
      const hostname = requestHost?.split(':')[0]
      if (hostname === serviceGovUkDomain) {
        return h.redirect(serviceGovUkRedirectUrl)
      }
    }

    return this.handleGet(req, h)
  }
}

/** @satisfies {ServerRegisterPluginObject<void>} */
export const home = new HomePageController(homePage, {
  methods: ['GET']
}).plugin()
