import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class GrazingFieldHowSeparatedPage extends Page {
  urlPath = '/biosecurity/grazing-field-how-separated'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'grazingFieldHowSeparated'
}

export const grazingFieldHowSeparatedPage = new GrazingFieldHowSeparatedPage()
