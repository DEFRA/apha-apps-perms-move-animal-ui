import { AddressAnswer } from '../../../common/model/answer/address/address.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'
import { fiftyPercentWarningPage } from '../fifty-percent-warning/index.js'
import { originSummaryPage } from '../summary/index.js'
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class ImportAddressPage extends QuestionPage {
  urlPath = '/origin/import-address'
  sectionKey = 'origin'
  question = 'What is the address of the UK point of entry?'

  questionKey = 'address'

  Answer = AddressAnswer

  /** @param {AddressAnswer} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer, context) {
    if (context.origin?.onOffFarm === 'off') {
      return originSummaryPage
    }

    return fiftyPercentWarningPage
  }
}

export const importAddressPage = new ImportAddressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const importAddress = new TbQuestionPageController(
  importAddressPage
).plugin()
