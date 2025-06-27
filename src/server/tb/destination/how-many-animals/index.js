import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { HowManyAnimalsAnswer } from '../../../common/model/answer/how-many-animals/how-many-animals.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'

export class HowManyAnimalsPage extends QuestionPage {
  urlPath = '/destination/how-many-animals'
  sectionKey = 'destination'
  question = 'How many animals are you planning to move?'
  questionKey = 'howManyAnimals'

  Answer = HowManyAnimalsAnswer

  nextPage() {
    return reasonForMovementPage
  }
}

export const howManyAnimalsPage = new HowManyAnimalsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const howManyAnimals = new QuestionPageController(
  howManyAnimalsPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
