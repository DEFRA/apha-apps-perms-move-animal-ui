import { Page } from '../../common/model/page/page-model.js'

export class EnterTestingDatesPage extends Page {
  urlPath = '/identification/enter-testing-dates'
  sectionKey = 'identification'
}

export const enterTestingDatesPage = new EnterTestingDatesPage()
