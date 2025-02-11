import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class PeopleDisinfectionPage extends Page {
  urlPath = '/biosecurity/people-disinfection'
  sectionKey = 'biosecurity'
  question = 'question to be asked'
  questionKey = 'peopleDisinfection'
}

export const peopleDisinfectionPage = new PeopleDisinfectionPage()
