import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'housingOther'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    spellcheck: false,
    rows: 4,
    validation: {
      empty: {
        message:
          'Enter details on the other measures being taken to reduce the spread of TB during housing'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}

export class HousingOtherPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-how-minimise-contamination-other'

  questionKey = questionKey
  sectionKey = 'biosecurity'
  question =
    'What other measures are being taken to reduce the spread of TB during housing?'

  Answer = Answer

  nextPage() {
    return peopleDisinfectionPage
  }
}

export const housingOtherPage = new HousingOtherPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const housingOther = new TbQuestionPageController(
  housingOtherPage
).plugin()
