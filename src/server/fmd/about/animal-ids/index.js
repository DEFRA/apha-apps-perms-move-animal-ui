import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalIds'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    rows: 8,
    hint: `For example, ear tags, slap marks, or flock numbers. If the animals don't have ID numbers, enter N/A.`,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message: `Enter the animal ID numbers or N/A if there aren't any`
      }
    }
  }
}

export class AnimalIdsPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/ID-number'

  questionKey = questionKey
  sectionKey = 'about'
  question =
    'What are the identification (ID) numbers for the animals being moved?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const animalIdsPage = new AnimalIdsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalIds = new FmdQuestionPageController(animalIdsPage).plugin()
