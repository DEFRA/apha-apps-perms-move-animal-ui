import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { CheckboxAnswer } from '~/src/server/common/model/answer/checkbox/checkbox.js'
import { grazingOtherPage } from '../grazing-other/index.js'
import { lastGrazedPage } from '../last-grazed/index.js'

/** @import { CheckboxConfig } from '~/src/server/common/model/answer/checkbox/checkbox.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'grazingFieldHowSeparated'

export class Answer extends CheckboxAnswer {
  /** @type { CheckboxConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      roads: {
        label: 'Roads create a boundary between the animals'
      },
      three: {
        label: 'A minimum of 3 metres will separate the animals'
      },
      other: {
        label: 'Other separation measures'
      }
    },
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    validation: {}
  }
}

export class GrazingFieldHowSeparatedPage extends QuestionPage {
  urlPath = '/biosecurity/grazing-field-how-separated'

  questionKey = questionKey
  sectionKey = 'biosecurity'
  question =
    'Which measures are being taken to reduce the spread of TB when the animals are grazing?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value.includes('other')) {
      return grazingOtherPage
    }

    return lastGrazedPage
  }
}

export const grazingFieldHowSeparatedPage = new GrazingFieldHowSeparatedPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const grazingFieldHowSeparated = new TbQuestionPageController(
  grazingFieldHowSeparatedPage
).plugin()
