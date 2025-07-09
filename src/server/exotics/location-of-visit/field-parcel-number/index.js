import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { isDesignatedPremisesPage } from '../is-designated-premises/index.js'
import { FieldParcelNumberAnswer } from '../../common/model/answer/field-parcel-number/field-parcel-number.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'fieldParcelNumber'
const customHeading = 'Field parcel number'

export class FieldParcelNumberPage extends QuestionPage {
  view = 'exotics/common/templates/field-parcel-number/index.njk'

  get heading() {
    return customHeading
  }

  urlPath = '/exotics/location-of-visit/field-parcel-number'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question = 'What is the field parcel number? '

  Answer = FieldParcelNumberAnswer

  nextPage() {
    return isDesignatedPremisesPage
  }
}

export const fieldParcelNumberPage = new FieldParcelNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const fieldParcelNumber = new ExoticsQuestionPageController(
  fieldParcelNumberPage
).plugin()
