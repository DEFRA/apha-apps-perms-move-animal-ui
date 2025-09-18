import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { driverNamePage } from '../driver-name/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'vehicleNumber'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    spellcheck: false,
    validation: {
      empty: {
        message: 'Enter the vehicle number plate'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class VehicleNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-details/vehicle-number'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'What is the number plate of the vehicle collecting the milk?'

  Answer = Answer

  nextPage() {
    return driverNamePage
  }
}

export const vehicleNumberPage = new VehicleNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const vehicleNumber = new FmdQuestionPageController(
  vehicleNumberPage
).plugin()
