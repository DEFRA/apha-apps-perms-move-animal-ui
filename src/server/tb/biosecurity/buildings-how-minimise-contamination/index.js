import { TbQuestionPageController } from '../../question-page-controller.js'
import { BuildingsHowMinimiseContaminationAnswer } from '../../../common/model/answer/buildings-how-minimise-contamination/buildings-how-minimise-contamination.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { buildingsHowMinimiseContaminationOtherPage } from './other/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

export class BuildingsHowMinimiseContaminationPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-how-minimise-contamination'
  sectionKey = 'biosecurity'
  question =
    'Which measures are being taken to reduce the spread of TB during housing?'

  questionKey = 'buildingsHowMinimiseContamination'
  Answer = BuildingsHowMinimiseContaminationAnswer

  /** @param {BuildingsHowMinimiseContaminationAnswer} answer */
  nextPage(answer) {
    if (answer.value?.includes('other')) {
      return buildingsHowMinimiseContaminationOtherPage
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
