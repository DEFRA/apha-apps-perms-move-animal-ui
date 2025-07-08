import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { cphExitPage } from '../cph-exit/index.js'
import { animalLocationCphNumberPage } from '../animal-location-cph-number/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalLocationHasACphNumber'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: {
        label: 'Yes'
      },
      no: {
        label: 'No'
      }
    },
    validation: {
      empty: 'Select if the origin premises has a CPH number'
    }
  }
}

export class AnimalLocationHasACphNumberPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/animal-location/cph-yes-no'

  questionKey = questionKey
  sectionKey = 'origin'
  question =
    'Does the origin premises have a county parish holding (CPH) number?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value === 'yes') {
      return animalLocationCphNumberPage
    }

    return cphExitPage
  }
}

export const animalLocationHasACphNumberPage =
  new AnimalLocationHasACphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalLocationHasACphNumber = new ExoticsQuestionPageController(
  animalLocationHasACphNumberPage
).plugin()
