import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { numberOfAnimalsPage } from '../number-of-animals/index.js'
import { typeOfBirdPage } from '../type-of-bird/index.js'
import { typeOfAnimalOtherPage } from '../type-of-animal-other/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfAnimal'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      cattle: { label: 'Cattle' },
      'sheep-and-goats': { label: 'Sheep and goats' },
      pigs: { label: 'Pigs' },
      birds: { label: 'Birds' },
      horses: { label: 'Horses' },
      camelids: { label: 'Camelids (such as llamas and alpacas)' },
      other: { label: 'Another type of animal' }
    },
    validation: {
      empty: 'Select the type of animal you are moving'
    }
  }
}

export class TypeOfAnimalPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement/what-is-moving/select-animals'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'Which type of animal are you moving?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'birds') {
      return typeOfBirdPage
    }

    if (answer.value === 'other') {
      return typeOfAnimalOtherPage
    }

    return numberOfAnimalsPage
  }
}

export const typeOfAnimalPage = new TypeOfAnimalPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfAnimal = new FmdQuestionPageController(
  typeOfAnimalPage
).plugin()
