import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { addressPage } from '../address/index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalLocationCphNumber'

export class AnimalLocationCphNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/animal-location/cph-number'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the CPH number for the origin premises?'

  Answer = CphNumberAnswer

  nextPage() {
    return addressPage
  }
}

export const animalLocationCphNumberPage = new AnimalLocationCphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalLocationCphNumber = new FmdQuestionPageController(
  animalLocationCphNumberPage
).plugin()
