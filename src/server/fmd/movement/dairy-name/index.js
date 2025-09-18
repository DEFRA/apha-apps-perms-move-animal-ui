import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { vehicleNumberPage } from '../vehicle-number/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'dairyName'

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
        message: 'Enter the name of the dairy'
      }
    }
  }
}

export class DairyNamePage extends QuestionPage {
  urlPath = '/fmd/movement-details/dairy-name'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'What is the name of the dairy collecting the milk?'

  Answer = Answer

  nextPage() {
    return vehicleNumberPage
  }
}

export const dairyNamePage = new DairyNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const dairyName = new FmdQuestionPageController(dairyNamePage).plugin()
