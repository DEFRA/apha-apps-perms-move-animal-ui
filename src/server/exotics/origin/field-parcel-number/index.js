import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { isDesignatedPremisesPage } from '../is-designated-premises/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'fieldParcelNumber'
const customHeading = 'Field parcel number'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    isPageHeading: false,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      },
      empty: { message: 'Enter the field parcel number' }
    }
  }
}

export class FieldParcelNumberPage extends QuestionPage {
  view = 'exotics/origin/field-parcel-number/index.njk'

  get heading() {
    return customHeading
  }

  urlPath = '/exotics/movement-origin/field-parcel-number'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the field parcel number? '

  Answer = Answer

  nextPage() {
    return isDesignatedPremisesPage
  }
}

export const fieldParcelNumberPage = new FieldParcelNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const fieldParcelNumber = new ExoticsQuestionPageController(
  fieldParcelNumberPage
).plugin()
