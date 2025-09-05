import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { disposalDatePage } from '../disposal-date/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'disposalWholeAnimal'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No, only parts of the animal (such as animal by-products)' }
    },
    validation: {
      empty: 'Select if you are disposing of the whole animal'
    },
    layout: 'inline'
  }
}

export class DisposalWholeAnimalPage extends QuestionPage {
  urlPath = '/fmd/disposal-of-animal/whole-animal'

  questionKey = questionKey
  sectionKey = 'disposal'
  question = 'Will you dispose of the whole animal?'

  Answer = Answer

  nextPage() {
    return disposalDatePage
  }
}

export const disposalWholeAnimalPage = new DisposalWholeAnimalPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const disposalWholeAnimal = new FmdQuestionPageController(
  disposalWholeAnimalPage
).plugin()
