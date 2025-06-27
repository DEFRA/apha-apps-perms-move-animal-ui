import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import { OtherEquipmentMeasuresAnswer } from '../../../common/model/answer/other-equipment-measures/other-equipment-measures.js'

export class OtherEquipmentMeasuresPage extends QuestionPage {
  urlPath = '/biosecurity/other-equipment-measures'
  sectionKey = 'biosecurity'
  question =
    'What other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'

  questionKey = 'otherEquipmentMeasures'

  Answer = OtherEquipmentMeasuresAnswer

  nextPage() {
    return peopleDisinfectionPage
  }
}

export const otherEquipmentMeasuresPage = new OtherEquipmentMeasuresPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const otherEquipmentMeasures = new QuestionPageController(
  otherEquipmentMeasuresPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
