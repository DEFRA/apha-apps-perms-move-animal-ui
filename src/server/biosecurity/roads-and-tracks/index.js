import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { RoadsAndTracksAnswer } from '../../common/model/answer/roads-and-tracks/roads-and-tracks.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'

export class RoadsAndTracksPage extends QuestionPage {
  urlPath = '/biosecurity/roads-and-tracks'
  sectionKey = 'biosecurity'
  question =
    'Will the incoming cattle come into contact with any roads or tracks used by the existing cattle?'

  questionKey = 'roadsAndTracks'
  Answer = RoadsAndTracksAnswer

  nextPage() {
    return buildingsAnySharedPage
  }
}

export const roadsAndTracksPage = new RoadsAndTracksPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const roadsAndTracks = new QuestionPageController(
  roadsAndTracksPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
