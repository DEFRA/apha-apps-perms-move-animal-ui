import { Page } from '../../common/model/page/page-model.js'

export class IdentificationSummaryPage extends Page {
  sectionKey = 'destination'
  urlPath = `/${this.sectionKey}/check-answers`
}

export const identificationSummaryPage = new IdentificationSummaryPage()
