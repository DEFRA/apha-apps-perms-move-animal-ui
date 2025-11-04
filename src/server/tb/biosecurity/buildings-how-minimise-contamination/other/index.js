import { QuestionPage } from '../../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../../question-page-controller.js'
import { BuildingsHowMinimiseContaminationOtherAnswer } from '../../../../common/model/answer/buildings-how-minimise-contamination-other/buildings-how-minimise-contamination-other.js'
import { peopleDisinfectionPage } from '../../people-disinfection/index.js'

export class BuildingsHowMinimiseContaminationOtherPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-how-minimise-contamination-other'
  sectionKey = 'biosecurity'
  question =
    'What other measures are being taken to reduce the spread of TB during housing?'

  questionKey = 'buildingsHowMinimiseContaminationOther'
  Answer = BuildingsHowMinimiseContaminationOtherAnswer

  nextPage() {
    return peopleDisinfectionPage
  }
}

export const buildingsHowMinimiseContaminationOtherPage =
  new BuildingsHowMinimiseContaminationOtherPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const buildingsHowMinimiseContaminationOther =
  new TbQuestionPageController(
    buildingsHowMinimiseContaminationOtherPage
  ).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
