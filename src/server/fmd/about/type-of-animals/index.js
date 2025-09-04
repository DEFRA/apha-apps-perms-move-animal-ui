import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class TypeOfAnimalsPage extends Page {
  urlPath = '/fmd/about-the-movement-or-activity/animal-type'
}

export const typeOfAnimalsPage = new TypeOfAnimalsPage()
