import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { DesignatedPremisesAnswer } from '../../common/model/answer/designated-premises/designated-premises.js'
import { animalsOnPremisesPage } from '../animals-on-premises/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'isDesignatedPremises'

export class IsDesignatedPremisesPage extends QuestionPage {
  urlPath = '/exotics/location-of-visit/designated-premises'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question = 'Is the premises designated?'

  Answer = DesignatedPremisesAnswer

  nextPage() {
    return animalsOnPremisesPage
  }
}

export const isDesignatedPremisesPage = new IsDesignatedPremisesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const isDesignatedPremises = new ExoticsQuestionPageController(
  isDesignatedPremisesPage
).plugin()
