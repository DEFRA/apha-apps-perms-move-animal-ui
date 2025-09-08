import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { whatAnimalsPage } from '../what-animals/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'gridRef'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    rows: 4,
    spellcheck: false,
    validation: {
      empty: {
        message: 'Enter the grid reference for the origin premises'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}

export class GridRefPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/grid-reference'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the grid reference of the location?'

  Answer = Answer

  nextPage() {
    return whatAnimalsPage
  }
}

export const gridRefPage = new GridRefPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const gridRef = new FmdQuestionPageController(gridRefPage).plugin()
