import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { RestockAnimalsAnswer } from '../../../common/model/answer/restock-animals/restock-animals.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { restockReasonPage } from '../restock-reason/index.js'

export class RestockAnimalPage extends QuestionPage {
  urlPath = '/destination/restocking-additional-info-animal-type'
  sectionKey = 'destination'
  question = 'Which types of animals are you restocking?'

  questionKey = 'restockAnimals'
  Answer = RestockAnimalsAnswer

  nextPage() {
    return restockReasonPage
  }
}

export const restockAnimalPage = new RestockAnimalPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const restockAnimal = new QuestionPageController(
  restockAnimalPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
