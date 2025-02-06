import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class GrazingPage extends Page {
  urlPath = '/biosecurity/grazing'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'grazing'
}

export const grazingPage = new GrazingPage()
