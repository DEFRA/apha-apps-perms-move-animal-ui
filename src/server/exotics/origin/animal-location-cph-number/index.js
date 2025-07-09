import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { addressPage } from '../address/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalLocationCphNumber'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'For example, 12/345/6789',
    spellcheck: false,
    characterWidth: 10,
    validation: {
      empty: {
        message: 'Enter the CPH number for the origin premises'
      },
      maxLength: {
        message:
          'Enter the CPH number in the correct format, for example, 12/345/6789',
        value: 11
      },
      pattern: {
        regex: /^(\d{2})\/(\d{3})\/(\d{4})$/i,
        message:
          'Enter the CPH number in the correct format, for example, 12/345/6789'
      }
    }
  }
}

export class AnimalLocationCphNumberPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/animal-location/cph-number'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the CPH number for the origin premises?'

  Answer = Answer

  nextPage() {
    return addressPage
  }
}

export const animalLocationCphNumberPage = new AnimalLocationCphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalLocationCphNumber = new ExoticsQuestionPageController(
  animalLocationCphNumberPage
).plugin()
