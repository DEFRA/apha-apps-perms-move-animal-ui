/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'
import { Page } from '~/src/server/common/model/page/page-model.js'
import { config } from '~/src/config/config.js'

export class HomePage extends Page {
  key = 'home'
  sectionKey = 'tb'
  view = 'tb/home/index.njk'
  urlPath = '/'
  pageTitle = config.get('serviceName')
  pageHeading = 'Get permission to move animals under disease controls'
}

export const homePage = new HomePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const home = new PageController(homePage, {
  methods: ['GET']
}).plugin()
