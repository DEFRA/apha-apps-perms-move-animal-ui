import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { numberOfAnimalsPage } from '../number-of-animals/index.js'
import { typeOfBirdUncommonPage } from '../type-of-bird-uncommon/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfBird'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      chickens: {
        label: 'Chickens'
      },
      turkeys: {
        label: 'Turkeys'
      },
      ducks: {
        label: 'Ducks'
      },
      geese: {
        label: 'Geese'
      },
      'birds-of-prey': {
        label: 'Birds of prey'
      },
      'racing-pigeons': {
        label: 'Racing pigeons'
      },
      other: {
        label: 'Another type of bird'
      }
    },
    validation: {
      empty: 'Select what type of bird you are moving'
    }
  }
}

export class TypeOfBirdPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement/what-is-moving/select-animals/birds'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What type of bird are you moving?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value === 'other') {
      return typeOfBirdUncommonPage
    }
    return numberOfAnimalsPage
  }
}

export const typeOfBirdPage = new TypeOfBirdPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfBird = new FmdQuestionPageController(typeOfBirdPage).plugin()
