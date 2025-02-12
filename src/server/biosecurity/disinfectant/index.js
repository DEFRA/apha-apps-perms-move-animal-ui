import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class DisinfectantPage extends Page {
  urlPath = '/biosecurity/disinfectant'
  sectionKey = 'biosecurity'
  question = 'question to be asked'
  questionKey = 'disinfectant'
}

export const disinfectantPage = new DisinfectantPage()
