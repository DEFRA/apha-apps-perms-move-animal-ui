import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'

// STUB PAGE
export class CarcassesSomewhereElseExitPage extends ExitPage {
  urlPath = '/fmd/movement-destination/somewhere-else'
}

export const carcassesSomewhereElseExitPage =
  new CarcassesSomewhereElseExitPage()
