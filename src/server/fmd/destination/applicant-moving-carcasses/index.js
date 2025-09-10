import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { destinationBusinessNamePage } from '../destination-business-name/index.js'
import { thirdPartyMovingPage } from '../third-party-moving/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'applicantMovingCarcasses'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No, a third party will move them' }
    },
    validation: {
      empty: 'Select if you are moving the carcasses'
    }
  }
}

export class ApplicantMovingCarcassesPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/business-receiving-the-licence'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Are you moving the carcasses?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return destinationBusinessNamePage
    }
    return thirdPartyMovingPage
  }
}

export const applicantMovingCarcassesPage = new ApplicantMovingCarcassesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const applicantMovingCarcasses = new FmdQuestionPageController(
  applicantMovingCarcassesPage
).plugin()
