import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { numberOfAnimalsPage } from '../number-of-animals/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfAnimalOther'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    stripWhitespace: true,
    characterWidth: 20,
    validation: {
      empty: {
        message: 'Enter the species type you are moving'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class TypeOfAnimalOtherPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement/what-is-moving/select-animals/other'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What type of species you are moving?'

  Answer = Answer

  nextPage() {
    return numberOfAnimalsPage
  }
}

export const typeOfAnimalOtherPage = new TypeOfAnimalOtherPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfAnimalOther = new FmdQuestionPageController(
  typeOfAnimalOtherPage
).plugin()
