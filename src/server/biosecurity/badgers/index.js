import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class BadgersPage extends Page {
  urlPath = '/biosecurity/badgers'
  sectionKey = 'biosecurity'
  question = 'question to be asked'
  questionKey = 'badgers'
}

export const badgersPage = new BadgersPage()
