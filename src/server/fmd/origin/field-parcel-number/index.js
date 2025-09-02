import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { isDesignatedPremisesPage } from '../is-designated-premises/index.js'
import { FieldParcelNumberAnswer } from '../../common/model/answer/field-parcel-number/field-parcel-number.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'fieldParcelNumber'
const customHeading = 'Field parcel number'

export class FieldParcelNumberPage extends QuestionPage {
  view = 'fmd/common/templates/field-parcel-number/index.njk'

  get heading() {
    return customHeading
  }

  urlPath = '/fmd/movement-origin/field-parcel-number'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the field parcel number? '

  Answer = FieldParcelNumberAnswer

  nextPage() {
    return isDesignatedPremisesPage
  }
}

export const fieldParcelNumberPage = new FieldParcelNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const fieldParcelNumber = new FmdQuestionPageController(
  fieldParcelNumberPage
).plugin()
