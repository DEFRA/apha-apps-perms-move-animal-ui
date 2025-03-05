import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { MaxNumberOfAnimalsAnswer } from '../../common/model/answer/max-number-of-animals/max-number-of-animals.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'

export class MaxNumberOfAnimalsPage extends QuestionPage {
  urlPath = '/destination/how-many-animals'
  sectionKey = 'destination'
  question = 'Enter the maximum number of animals you are planning to move'
  questionKey = 'maxNumberOfAnimals'

  Answer = MaxNumberOfAnimalsAnswer

  nextPage() {
    return reasonForMovementPage
  }
}

export const maxNumberOfAnimalsPage = new MaxNumberOfAnimalsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const maxNumberOfAnimals = new QuestionPageController(
  maxNumberOfAnimalsPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
