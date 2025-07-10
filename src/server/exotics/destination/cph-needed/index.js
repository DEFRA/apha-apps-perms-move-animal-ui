import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CphNeededPage extends Page {
  urlPath = '/exotics/movement-destination/cph-needed'
}

export const cphNeededPage = new CphNeededPage()
