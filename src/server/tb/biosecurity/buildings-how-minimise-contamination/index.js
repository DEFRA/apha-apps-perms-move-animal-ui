import { TbQuestionPageController } from '../../question-page-controller.js'
import { BuildingsHowMinimiseContaminationAnswer } from '../../../common/model/answer/buildings-how-minimise-contamination/buildings-how-minimise-contamination.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import { housingOtherPage } from '../housing-other/index.js'

const customHeading = 'Housing the incoming animals'

export class BuildingsHowMinimiseContaminationPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-how-minimise-contamination'
  sectionKey = 'biosecurity'
  question =
    'How will you reduce the risk of spreading TB from the resident herd to the incoming animals during housing?'

  questionKey = 'buildingsHowMinimiseContamination'
  Answer = BuildingsHowMinimiseContaminationAnswer

  get heading() {
    return customHeading
  }

  view = 'tb/biosecurity/buildings-how-minimise-contamination/index'

  nextPage(answer) {
    if (answer.value === 'yes') {
      return housingOtherPage
    }

    return peopleDisinfectionPage
  }
}

export const buildingsHowMinimiseContaminationPage =
  new BuildingsHowMinimiseContaminationPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const buildingsHowMinimiseContamination = new TbQuestionPageController(
  buildingsHowMinimiseContaminationPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
