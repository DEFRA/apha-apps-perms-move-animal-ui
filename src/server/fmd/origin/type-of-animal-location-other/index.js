import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { animalLocationHasACphNumberPage } from '../animal-location-has-a-cph-number/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfAnimalLocationOther'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 20,
    validation: {
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      },
      empty: {
        message: 'Enter the type of premises where the animals are kept'
      }
    }
  }
}

export class TypeOfAnimalLocationOtherPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/animal-location/enter-premises-type'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What type of premises are the animals kept at?'

  Answer = Answer

  nextPage() {
    return animalLocationHasACphNumberPage
  }
}

export const typeOfAnimalLocationOtherPage = new TypeOfAnimalLocationOtherPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfAnimalLocationOther = new FmdQuestionPageController(
  typeOfAnimalLocationOtherPage
).plugin()
