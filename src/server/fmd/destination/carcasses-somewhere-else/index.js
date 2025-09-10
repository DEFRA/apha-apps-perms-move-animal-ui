import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class CarcassesSomewhereElseExitPage extends ExitPage {
  urlPath = '/fmd/movement-destination/somewhere-else'
  pageTitle = 'Carcasses must be disposed of at certain locations'
  view = 'fmd/destination/carcasses-somewhere-else/index'
  key = 'carcassesSomewhereElse'
  sectionKey = 'destination`'
}
export const carcassesSomewhereElseExitPage =
  new CarcassesSomewhereElseExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const carcassesSomewhereElse = new PageController(
  carcassesSomewhereElseExitPage,
  {
    methods: ['GET']
  }
).plugin()
