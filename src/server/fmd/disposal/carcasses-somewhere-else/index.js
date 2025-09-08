import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class CarcassesSomewhereElseExitPage extends ExitPage {
  urlPath = '/fmd/disposal-of-animals/carcasses-somewhere-else'
  pageTitle = 'You must dispose of carcasses at certain locations'
  view = 'fmd/disposal/carcasses-somewhere-else/index'
  key = 'carcassesSomewhereElse'
  sectionKey = 'disposal`'
}
export const carcassesSomewhereElseExitPage =
  new CarcassesSomewhereElseExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const CarcassesSomewhereElse = new PageController(
  carcassesSomewhereElseExitPage,
  {
    methods: ['GET']
  }
).plugin()
