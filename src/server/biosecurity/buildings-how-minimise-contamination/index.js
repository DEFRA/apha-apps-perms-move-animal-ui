import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { BuildingsHowMinimiseContaminationAnswer } from '../../common/model/answer/buildings-how-minimise-contamination/buildings-how-minimise-contamination.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

export class BuildingsHowMinimiseContaminationPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-how-minimise-contamination'
  sectionKey = 'biosecurity'
  question = 'How will you reduce building and equipment contamination?'
  questionKey = 'buildingsHowMinimiseContamination'
  Answer = BuildingsHowMinimiseContaminationAnswer

  nextPage() {
    return peopleDisinfectionPage
  }
}

export const buildingsHowMinimiseContaminationPage =
  new BuildingsHowMinimiseContaminationPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const buildingsHowMinimiseContamination = new QuestionPageController(
  buildingsHowMinimiseContaminationPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
