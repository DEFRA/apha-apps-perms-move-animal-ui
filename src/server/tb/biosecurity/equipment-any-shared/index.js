import { TbQuestionPageController } from '../../question-page-controller.js'
import { EquipmentAnySharedAnswer } from '../../../common/model/answer/equipment-any-shared/equipment-any-shared.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { equipmentHowMinimiseContaminationPage } from '../equipment-how-minimise-contamination/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

export class EquipmentAnySharedPage extends QuestionPage {
  urlPath = '/biosecurity/equipment-any-shared'
  sectionKey = 'biosecurity'
  question =
    'Will the incoming animals share any equipment and machinery with the resident herd?'

  questionKey = 'equipmentShared'
  Answer = EquipmentAnySharedAnswer

  /** @param {EquipmentAnySharedAnswer} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'yes') {
      return equipmentHowMinimiseContaminationPage
    }
    return peopleDisinfectionPage
  }
}

export const equipmentAnySharedPage = new EquipmentAnySharedPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const equipmentAnyShared = new TbQuestionPageController(
  equipmentAnySharedPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
