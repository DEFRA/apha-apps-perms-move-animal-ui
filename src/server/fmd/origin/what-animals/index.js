import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { CheckboxAnswer } from '~/src/server/common/model/answer/checkbox/checkbox.js'
import { checkAnswersPage } from '../check-answers/index.js'
import { mockOriginPage } from '../mock-page/index.js'

/** @import { CheckboxConfig } from '~/src/server/common/model/answer/checkbox/checkbox.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'whatAnimals'

export class Answer extends CheckboxAnswer {
  /** @type { CheckboxConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'Select all that apply',
    options: {
      cattle: {
        label: 'Cattle'
      },
      sheep: {
        label: 'Sheep'
      },
      goats: {
        label: 'Goats'
      },
      pigs: {
        label: 'Pigs'
      },
      camelids: {
        label: 'Camelids'
      },
      other: {
        label: 'Other cloven-hooved animals'
      },
      divider: {
        label: 'or'
      },
      noneabove: {
        label: 'None of these animals',
        exclusive: true
      }
    },
    validation: {
      empty: {
        message: 'Select what animals are kept on the premises'
      }
    }
  }
}

export class WhatAnimalsPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/animals-kept-on-premises'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What animals are kept on the premises?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value.includes('other')) {
      return mockOriginPage
    }

    return checkAnswersPage
  }
}

export const whatAnimalsPage = new WhatAnimalsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const whatAnimals = new FmdQuestionPageController(
  whatAnimalsPage
).plugin()
