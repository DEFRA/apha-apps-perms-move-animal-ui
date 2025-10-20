import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { SlurryManureOtherAnswer } from '~/src/server/common/model/answer/slurry-manure-other/slurry-manure-other.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { disinfectantPage } from '../disinfectant/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class SlurryManureOtherPage extends QuestionPage {
  urlPath = '/biosecurity/manure-and-slurry-details-other'
  sectionKey = 'biosecurity'
  question = 'What other measures are being taken to manage slurry and manure?'
  questionKey = 'SlurryManureOther'

  Answer = SlurryManureOtherAnswer

  nextPage() {
    return disinfectantPage
  }
}

export const slurryManureOtherPage = new SlurryManureOtherPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const slurryManureOther = new TbQuestionPageController(
  slurryManureOtherPage
).plugin()
