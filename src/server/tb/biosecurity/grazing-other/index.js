import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { manureAndSlurryDetailsPage } from '../manure-and-slurry-details/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'grazingOther'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    rows: 4,
    spellcheck: false,
    validation: {
      empty: {
        message:
          'Enter details on the other measures being taken to reduce the spread of TB when the animals are grazing'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters '
      }
    }
  }
}

export class GrazingOtherPage extends QuestionPage {
  urlPath = '/biosecurity/grazing-field-how-separated-other'

  questionKey = questionKey
  sectionKey = 'biosecurity'
  question =
    'What other measures are being taken to reduce the spread of TB when the animals are grazing?'

  Answer = Answer

  nextPage() {
    return manureAndSlurryDetailsPage
  }
}

export const grazingOtherPage = new GrazingOtherPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const grazingOther = new TbQuestionPageController(
  grazingOtherPage
).plugin()
