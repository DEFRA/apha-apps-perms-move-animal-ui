import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { EquipmentHowMinimiseContaminationAnswer } from '../../common/model/answer/equipment-how-minimise-contamination/equipment-how-minimise-contamination.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

const customHeading = 'Shared equipment'

export class EquipmentHowMinimiseContaminationPage extends QuestionPage {
  urlPath = '/biosecurity/equipment-how-minimise-contamination'
  sectionKey = 'biosecurity'
  question =
    'How will you minimise the risk of spread of TB infection to the incoming cattle when using shared equipment?'

  questionKey = 'equipmentHowMinimiseContamination'
  Answer = EquipmentHowMinimiseContaminationAnswer

  get heading() {
    return customHeading
  }

  view = 'biosecurity/equipment-how-minimise-contamination/index'

  nextPage() {
    return peopleDisinfectionPage
  }
}

export const equipmentHowMinimiseContaminationPage =
  new EquipmentHowMinimiseContaminationPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const equipmentHowMinimiseContamination = new QuestionPageController(
  equipmentHowMinimiseContaminationPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
