import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { animalLocationHasACphNumberPage } from '../animal-location-has-a-cph-number/index.js'
import { animalLocationCphNumberPage } from '../animal-location-cph-number/index.js'
import { addressPage } from '../address/index.js'
import { typeOfAnimalLocationOtherPage } from '../type-of-animal-location-other/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfAnimalLocation'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      farm: {
        label: 'Farm'
      },
      'corporate-holding': {
        label: 'Corporate holding',
        hint: 'Such as a food business or animal feed company'
      },
      'domestic-residence': {
        label: 'Domestic residence'
      },
      other: {
        label: 'Other'
      }
    },
    validation: {
      empty: 'Select where the animals are kept'
    }
  }
}

export class TypeOfAnimalLocationPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/animal-location'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'Where are the animals kept?'

  Answer = Answer

  nextPage(answer, state) {
    if (answer.value === 'domestic-residence') {
      return this._isDomesticResidence(answer, state)
    }

    if (answer.value === 'other') {
      return typeOfAnimalLocationOtherPage
    }

    return animalLocationCphNumberPage
  }

  _isDomesticResidence(_answer, state) {
    if (
      ['pigs', 'sheep-and-goats', 'cattle'].includes(state?.about?.typeOfAnimal)
    ) {
      return animalLocationHasACphNumberPage
    }

    return addressPage
  }
}

export const typeOfAnimalLocationPage = new TypeOfAnimalLocationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfAnimalLocation = new ExoticsQuestionPageController(
  typeOfAnimalLocationPage
).plugin()
