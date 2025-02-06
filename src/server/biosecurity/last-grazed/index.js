import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class LastGrazedPage extends Page {
  urlPath = '/biosecurity/last-grazed'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'lastGrazed'
}

export const lastGrazedPage = new LastGrazedPage()
