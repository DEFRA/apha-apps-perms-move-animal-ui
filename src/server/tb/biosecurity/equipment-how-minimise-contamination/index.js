import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { EquipmentHowMinimiseContaminationAnswer } from '../../../common/model/answer/equipment-how-minimise-contamination/equipment-how-minimise-contamination.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { otherEquipmentMeasuresPage } from '../other-equipment-measures/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

export class EquipmentHowMinimiseContaminationPage extends QuestionPage {
  urlPath = '/biosecurity/equipment-how-minimise-contamination'
  sectionKey = 'biosecurity'
  question =
    'Which measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'

  questionKey = 'equipmentHowMinimiseContamination'
  Answer = EquipmentHowMinimiseContaminationAnswer

  /** @param {EquipmentHowMinimiseContaminationAnswer} answer */
  nextPage(answer) {
    if (answer.value?.includes('other')) {
      return otherEquipmentMeasuresPage
    } else {
      return peopleDisinfectionPage
    }
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
