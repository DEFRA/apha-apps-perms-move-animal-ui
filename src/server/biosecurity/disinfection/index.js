import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'

export class DisinfectionPage extends QuestionPage {
  urlPath = '/biosecurity/people-disinfection'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'disinfection'
}

export const disinfectionPage = new DisinfectionPage()
