import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { CountryAnswer } from '../../../common/model/answer/country/country.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { importCphPage } from '../import-cph/index.js'
//
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class CountryPage extends QuestionPage {
  urlPath = '/origin/country'
  sectionKey = 'origin'
  question = 'Which country are the animals coming from?'
  questionKey = 'country'
  Answer = CountryAnswer

  nextPage() {
    return importCphPage
  }
}

export const countryPage = new CountryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const country = new QuestionPageController(countryPage).plugin()
