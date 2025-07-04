import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { numberOfAnimalsPage } from '../number-of-animals/index.js'
import { typeOfBirdOtherPage } from '../type-of-bird-other/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfBirdUncommon'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      'avairy-birds': {
        label: 'Birds in large enclosures (aviary birds)'
      },
      pheasant: {
        label: 'Pheasant'
      },
      partridge: {
        label: 'Partridge'
      },
      quail: {
        label: 'Quail'
      },
      grouse: {
        label: 'Grouse'
      },
      other: {
        label: 'Another type of bird'
      }
    },
    validation: {
      empty: 'Select which types of birds you are moving'
    }
  }
}

export class TypeOfBirdUncommonPage extends QuestionPage {
  urlPath =
    '/exotics/about-the-movement/what-is-moving/select-animals/birds/other-birds'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What type of bird are you moving?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value === 'other') {
      return typeOfBirdOtherPage
    }
    return numberOfAnimalsPage
  }
}

export const typeOfBirdUncommonPage = new TypeOfBirdUncommonPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfBirdUncommon = new ExoticsQuestionPageController(
  typeOfBirdUncommonPage
).plugin()
