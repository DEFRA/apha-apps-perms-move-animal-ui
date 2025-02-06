import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { yesNoRadioButtonFactory } from '../../common/model/answer/yes-no-radio-button/yes-no-radio-button.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { lastGrazedPage } from '../last-grazed/index.js'
import { roadsAndTracksPage } from '../roads-and-tracks/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 * @import { RadioButtonAnswer } from '../../common/model/answer/radio-button/radio-button.js'
 */

export class GrazingPage extends QuestionPage {
  urlPath = '/biosecurity/grazing'
  sectionKey = 'biosecurity'
  question = 'Will the incoming cattle be grazed?'
  questionKey = 'grazing'
  Answer = yesNoRadioButtonFactory({
    payloadKey: 'grazing',
    emptyOptionText: 'Select yes if the incoming cattle will be grazed',
    layout: 'inline'
  })

  /** @param {RadioButtonAnswer} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'yes') {
      return lastGrazedPage
    }
    return roadsAndTracksPage
  }
}

export const grazingPage = new GrazingPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const grazing = new QuestionPageController(grazingPage).plugin()
