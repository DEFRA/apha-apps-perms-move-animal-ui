import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'

// STUB PAGE
export class OriginResponsiblePersonNamePage extends QuestionPage {
  urlPath = '/fmd/receiving-the-licence/name-of-person-responsible-at-origin'
}

export const originResponsiblePersonNamePage =
  new OriginResponsiblePersonNamePage()
