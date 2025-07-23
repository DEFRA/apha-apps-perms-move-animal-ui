import { TbQuestionPageController } from '../../question-page-controller.js'
import { HowManyAnimalsAnswer } from '../../../common/model/answer/how-many-animals/how-many-animals.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'
import { dateOfMovementPage } from '../date-of-movement/index.js'
import { additionalInfoPage } from '../additional-info/index.js'

export class HowManyAnimalsPage extends QuestionPage {
  urlPath = '/destination/how-many-animals'
  sectionKey = 'destination'
  question = 'How many animals are you planning to move?'
  questionKey = 'howManyAnimals'

  Answer = HowManyAnimalsAnswer

  nextPage(_answer, context) {
    if (
      context.origin?.onOffFarm === 'off' &&
      context.origin?.originType === 'iso-unit'
    ) {
      if (context.destination?.destinationType === 'slaughter') {
        return dateOfMovementPage
      }

      if (context.destination?.destinationType === 'afu') {
        return additionalInfoPage
      }
    }

    return reasonForMovementPage
  }
}

export const howManyAnimalsPage = new HowManyAnimalsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const howManyAnimals = new TbQuestionPageController(
  howManyAnimalsPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
