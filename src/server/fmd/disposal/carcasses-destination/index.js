import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { destinationBusinessNamePage } from '../destination-business-name/index.js'
import { carcassesSomewhereElseExitPage } from '../carcasses-somewhere-else/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'carcassesDestination'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      'knackers-yard': { label: "Knacker's yard" },
      'rendering-plant': { label: 'Rendering plant' },
      incinerator: { label: 'Incinerator' },
      'hunt-kennel': { label: 'Hunt kennel' },
      'somewhere-else': { label: 'Somewhere else' }
    },
    validation: {
      empty: 'Select where the carcasses are going'
    }
  }
}

export class CarcassesDestinationPage extends QuestionPage {
  urlPath = '/fmd/disposal-of-animals/carcasses-premises-type'

  questionKey = questionKey
  sectionKey = 'disposal'
  question = 'Where are the carcasses going?'

  Answer = Answer

  /**
   * @param {Answer} answer
   */
  nextPage(answer) {
    if (answer.value === 'somewhere-else') {
      return carcassesSomewhereElseExitPage
    }
    return destinationBusinessNamePage
  }
}

export const carcassesDestinationPage = new CarcassesDestinationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const carcassesDestination = new FmdQuestionPageController(
  carcassesDestinationPage
).plugin()
