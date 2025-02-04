import { Page } from '~/src/server/common/model/page/page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

export class CookiesPolicyPage extends Page {
  sectionKey = 'policies'
  key = 'cookies'
  pageTitle = 'Cookies'
  pageHeading = 'Cookies'
  urlPath = '/cookies'
  view = 'cookies-policy/index'
}

export const cookiesPolicyPage = new CookiesPolicyPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cookiesPolicy = new PageController(cookiesPolicyPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
