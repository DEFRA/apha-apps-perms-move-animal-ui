import { TbQuestionPageController } from '../../question-page-controller.js'
import { BuildingsAnySharedAnswer } from '../../../common/model/answer/buildings-any-shared/buildings-any-shared.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { buildingsHowMinimiseContaminationPage } from '../buildings-how-minimise-contamination/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

export class BuildingsAnySharedPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-any-shared'
  sectionKey = 'biosecurity'
  question = 'Will the incoming animals be housed?'

  questionKey = 'animalsHoused'
  Answer = BuildingsAnySharedAnswer

  /** @param {BuildingsAnySharedAnswer} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'yes') {
      return buildingsHowMinimiseContaminationPage
    }
    return peopleDisinfectionPage
  }
}

export const buildingsAnySharedPage = new BuildingsAnySharedPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const buildingsAnyShared = new TbQuestionPageController(
  buildingsAnySharedPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
