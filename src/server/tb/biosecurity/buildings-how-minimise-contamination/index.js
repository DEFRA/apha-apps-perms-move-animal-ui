import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { BuildingsHowMinimiseContaminationAnswer } from '../../../common/model/answer/buildings-how-minimise-contamination/buildings-how-minimise-contamination.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { equipmentAnySharedPage } from '../equipment-any-shared/index.js'

const customHeading = 'Housing the incoming cattle'

export class BuildingsHowMinimiseContaminationPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-how-minimise-contamination'
  sectionKey = 'biosecurity'
  question =
    'How will you minimise the risk of TB infection from the resident cattle to the incoming cattle during housing?'

  questionKey = 'buildingsHowMinimiseContamination'
  Answer = BuildingsHowMinimiseContaminationAnswer

  get heading() {
    return customHeading
  }

  view = 'tb/biosecurity/buildings-how-minimise-contamination/index'

  nextPage() {
    return equipmentAnySharedPage
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
