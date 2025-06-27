import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { importAddressPage } from '../import-address/index.js'
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class ImportCphPage extends QuestionPage {
  urlPath = '/origin/import-cph'
  key = 'ImportCphPage'
  question =
    'What is the County Parish Holding (CPH) number of the UK point of entry?'

  sectionKey = 'origin'
  questionKey = 'cphNumber'

  Answer = CphNumberAnswer

  /** @param {CphNumberAnswer} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return importAddressPage
  }
}

export const importCphPage = new ImportCphPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const importCph = new QuestionPageController(importCphPage).plugin()
