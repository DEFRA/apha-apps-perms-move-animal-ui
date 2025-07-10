import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class ResponsiblePersonNamePage extends Page {
  urlPath = '/exotics/movement-destination/responsible-person-name'
}

export const responsiblePersonNamePage = new ResponsiblePersonNamePage()
