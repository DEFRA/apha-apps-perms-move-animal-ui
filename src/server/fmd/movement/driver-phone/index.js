import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { collectionPremisesPage } from '../collection-premises/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'driverPhone'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    validation: {
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      },
      empty: {
        message: "Enter the vehicle driver's phone number"
      }
    }
  }
}

export class DriverPhonePage extends QuestionPage {
  urlPath = '/fmd/movement-details/driver-phone-number'

  questionKey = questionKey
  sectionKey = 'movement'
  question = "What is the vehicle driver's phone number?"

  Answer = Answer

  nextPage() {
    return collectionPremisesPage
  }
}

export const driverPhonePage = new DriverPhonePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const driverPhone = new FmdQuestionPageController(
  driverPhonePage
).plugin()
