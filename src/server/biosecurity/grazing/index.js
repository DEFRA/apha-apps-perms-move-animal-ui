import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'

export class GrazingPage extends QuestionPage {
  urlPath = '/biosecurity/grazing'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'grazing'
}

export const grazingPage = new GrazingPage()
