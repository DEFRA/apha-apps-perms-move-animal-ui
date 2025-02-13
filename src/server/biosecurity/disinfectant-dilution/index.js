import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class DisinfectantDilutionPage extends Page {
  urlPath = '/biosecurity/disinfectant-dilution'
  sectionKey = 'biosecurity'
  question = 'question to be asked'
  questionKey = 'disinfectantDilution'
}

export const disinfectantDilutionPage = new DisinfectantDilutionPage()
