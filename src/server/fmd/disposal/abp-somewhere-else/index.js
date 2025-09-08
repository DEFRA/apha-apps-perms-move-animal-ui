import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class AbpSomewhereElseExitPage extends ExitPage {
  urlPath = '/fmd/disposal-of-animals/ABP-somewhere-else'
  pageTitle = 'You must dispose of animal by products at certain locations'
  view = 'fmd/disposal/abp-somewhere-else/index'
  key = 'abpSomewhereElse'
  sectionKey = 'disposal`'
}
export const abpSomewhereElseExitPage = new AbpSomewhereElseExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const abpSomewhereElse = new PageController(abpSomewhereElseExitPage, {
  methods: ['GET']
}).plugin()
