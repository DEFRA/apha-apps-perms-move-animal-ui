import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { QuestionPageController } from '~/src/server/common/controller/question-page-controller/question-page-controller.js'
import { disinfectionPage } from '../disinfection/index.js'
import { grazingPage } from '../grazing/index.js'
import { yesNoRadioButtonFactory } from '../../common/model/answer/yes-no-radio-button/yes-no-radio-button.js'

/**
 * @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js"
 * @import { RadioButtonAnswer } from '../../common/model/answer/radio-button/radio-button.js'
 */

export class KeptSeparatelyPage extends QuestionPage {
  urlPath = '/biosecurity/kept-separately'
  sectionKey = 'biosecurity'
  question = 'Will you separate the incoming cattle from the resident herd?'
  questionKey = 'keptSeparately'
  Answer = yesNoRadioButtonFactory({
    payloadKey: 'keptSeparately',
    emptyOptionText: 'Select if the incoming cattle will be kept separately',
    layout: 'inline'
  })

  /** @param {RadioButtonAnswer} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'yes') {
      return grazingPage
    }
    return disinfectionPage
  }
}

export const keptSeparatelyPage = new KeptSeparatelyPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const keptSeparately = new QuestionPageController(
  keptSeparatelyPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
