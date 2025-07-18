/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'
import { Page } from '~/src/server/common/model/page/page-model.js'

const pageHeadingAndTitle = 'Move animals under disease controls'

export class HomePage extends Page {
  skipAuth = true
  key = 'home'
  sectionKey = 'exotics'
  view = 'exotics/home/index.njk'
  urlPath = '/exotics'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export const homePage = new HomePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const home = new PageController(homePage, {
  methods: ['GET']
}).plugin()
