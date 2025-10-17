import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'
import { OtherEquipmentMeasuresAnswer } from '../../../common/model/answer/other-equipment-measures/other-equipment-measures.js'

export class OtherEquipmentMeasuresPage extends QuestionPage {
  urlPath = '/biosecurity/other-equipment-measures'
  sectionKey = 'biosecurity'
  question =
    'What other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'

  questionKey = 'otherEquipmentMeasures'

  Answer = OtherEquipmentMeasuresAnswer

  nextPage() {
    return buildingsAnySharedPage
  }
}

export const otherEquipmentMeasuresPage = new OtherEquipmentMeasuresPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const otherEquipmentMeasures = new TbQuestionPageController(
  otherEquipmentMeasuresPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
