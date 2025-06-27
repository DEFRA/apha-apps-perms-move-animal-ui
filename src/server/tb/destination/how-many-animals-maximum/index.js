import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { HowManyAnimalsMaximumAnswer } from '../../../common/model/answer/how-many-animals-maximum/how-many-animals-maximum.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'

export class HowManyAnimalsMaximumPage extends QuestionPage {
  urlPath = '/destination/how-many-animals-maximum'
  sectionKey = 'destination'
  question = 'What is the maximum number of animals you are planning to move?'
  questionKey = 'howManyAnimalsMaximum'

  Answer = HowManyAnimalsMaximumAnswer

  nextPage() {
    return reasonForMovementPage
  }
}

export const howManyAnimalsMaximumPage = new HowManyAnimalsMaximumPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const howManyAnimalsMaximum = new QuestionPageController(
  howManyAnimalsMaximumPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
