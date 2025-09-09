import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class AbattoirNamePage extends Page {
  urlPath = '/fmd/movement-destination/abattoir-name'
}

export const abattoirNamePage = new AbattoirNamePage()
