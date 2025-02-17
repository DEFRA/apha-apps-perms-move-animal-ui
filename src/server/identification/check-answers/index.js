import Page from '../../common/model/page/summary-page/SummaryPageModel.js'

export class IdentificationSummaryPage extends Page {
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/check-answers`
}

export const identificationSummaryPage = new IdentificationSummaryPage()
