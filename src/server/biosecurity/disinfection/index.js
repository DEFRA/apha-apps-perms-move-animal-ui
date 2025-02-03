import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class DisinfectionPage extends Page {
  urlPath = '/biosecurity/people-disinfection'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'disinfection'
}

export const disinfectionPage = new DisinfectionPage()
