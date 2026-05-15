import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { contactTbRestrictedFarmPage } from '../contact-tb-restricted-farm/index.js'
import { destinationTypeOtherPage } from '../destination-type-other/index.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

const questionKey = 'ownBothOriginAndDestination'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    layout: 'inline',
    validation: {
      empty:
        'Select if you are responsible for the TB restricted farm where the animals are going to'
    }
  }
}

export class OwnBothOriginAndDestinationPage extends QuestionPage {
  urlPath = '/destination/who-is-responsible'

  questionKey = questionKey
  sectionKey = 'destination'
  question =
    'Are you responsible for the TB restricted farm where the animals are going to?'

  Answer = Answer

  /**
   * @param {Answer} answer
   * @param {RawApplicationState} context
   */
  nextPage(answer, context) {
    if (answer.value === 'yes') {
      if (context.origin?.originType === 'other') {
        return destinationTypeOtherPage
      }
      return destinationFarmCphPage
    }
    return contactTbRestrictedFarmPage
  }
}

export const ownBothOriginAndDestinationPage =
  new OwnBothOriginAndDestinationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const ownBothOriginAndDestination = new TbQuestionPageController(
  ownBothOriginAndDestinationPage
).plugin()
