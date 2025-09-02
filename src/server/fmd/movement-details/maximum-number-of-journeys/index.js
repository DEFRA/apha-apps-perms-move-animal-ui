import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { isDurationMoreThanOneDayPage } from '../is-duration-more-than-one-day/index.js'
import { datePage } from '../date/index.js'

/** @import { NumberConfig } from '~/src/server/common/model/answer/number/number.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const min = 1
const max = 1000
const questionKey = 'maximumNumberOfJourneys'

export class Answer extends NumberAnswer {
  /** @type { NumberConfig } */
  static config = {
    payloadKey: questionKey,
    stripWhitespace: true,
    characterWidth: 2,
    validation: {
      empty: {
        message:
          'Enter the maximum number of journeys needed to move the animals or products'
      },
      min: { value: min, message: `Enter a number ${min} or above` },
      max: { value: max, message: `Enter a number ${max} or below` }
    }
  }
}

export class MaximumNumberOfJourneysPage extends QuestionPage {
  urlPath = '/fmd/movement-details/maximum-number-of-journeys'

  questionKey = questionKey
  sectionKey = 'movementDetails'
  question =
    'What are the maximum number of journeys needed to move the animals or products?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (Number(answer.value) === 1) {
      return datePage
    }
    return isDurationMoreThanOneDayPage
  }
}

export const maximumNumberOfJourneysPage = new MaximumNumberOfJourneysPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const maximumNumberOfJourneys = new FmdQuestionPageController(
  maximumNumberOfJourneysPage
).plugin()
