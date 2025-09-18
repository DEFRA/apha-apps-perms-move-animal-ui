import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { twoWeekRepeatPage } from '../two-week-repeat/index.js'

// TEMPLATE-TODO: import next page

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'collectionPremises'

export class Answer extends TextAreaAnswer {
  // TEMPLATE-TODO: update config as needed

  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'Enter the full names of the premises',
    rows: 10,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message: 'Enter the premises names the vehicle will visit on collection day'
      }
    }
  }
}

export class CollectionPremisesPage extends QuestionPage {
  urlPath = '/fmd/movement-details/premises-names'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'List the premises the vehicle will visit on the collection day'

  Answer = Answer

  nextPage() {
    return twoWeekRepeatPage
  }
}

export const collectionPremisesPage = new CollectionPremisesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const collectionPremises = new FmdQuestionPageController(
  collectionPremisesPage
).plugin()
