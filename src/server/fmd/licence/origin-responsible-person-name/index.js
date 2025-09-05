import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'

// STUB PAGE
export class OriginResponsiblePersonNamePage extends ExitPage {
  urlPath = '/fmd/receiving-the-licence/name-of-person-responsible-at-origin'
}

export const originResponsiblePersonNamePage =
  new OriginResponsiblePersonNamePage()
