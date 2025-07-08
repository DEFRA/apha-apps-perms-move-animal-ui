import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { isDesignatedPremisesPage } from '../is-designated-premises/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'latitudeAndLongitude'
const customHeading = 'Location details'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    isPageHeading: false,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      },
      empty: { message: 'Enter the latitude and longitude measurements' }
    }
  }
}

export class LatitudeAndLongitudePage extends QuestionPage {
  view = 'exotics/origin/latitude-and-longitude/index.njk'

  get heading() {
    return customHeading
  }

  urlPath = '/exotics/movement-origin/location-details'

  questionKey = questionKey
  sectionKey = 'origin'
  question =
    'What are the latitude and longitude measurements for the origin premises? '

  Answer = Answer

  nextPage() {
    return isDesignatedPremisesPage
  }
}

export const latitudeAndLongitudePage = new LatitudeAndLongitudePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const latitudeAndLongitude = new ExoticsQuestionPageController(
  latitudeAndLongitudePage
).plugin()
