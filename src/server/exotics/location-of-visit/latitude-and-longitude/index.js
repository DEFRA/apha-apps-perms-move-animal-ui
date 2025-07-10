import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { isDesignatedPremisesPage } from '../is-designated-premises/index.js'
import { LatitudeAndLongitudeAnswer } from '../../common/model/answer/latitude-and-longitude/latitude-and-longitude.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'latitudeAndLongitude'
const customHeading = 'Location details'

export class LatitudeAndLongitudePage extends QuestionPage {
  view = 'exotics/common/templates/latitude-and-longitude/index.njk'

  get heading() {
    return customHeading
  }

  urlPath = '/exotics/location-of-visit/location-details'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question =
    'What are the latitude and longitude measurements for the location of the visit?'

  Answer = LatitudeAndLongitudeAnswer

  nextPage() {
    return isDesignatedPremisesPage
  }
}

export const latitudeAndLongitudePage = new LatitudeAndLongitudePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const latitudeAndLongitude = new ExoticsQuestionPageController(
  latitudeAndLongitudePage
).plugin()
