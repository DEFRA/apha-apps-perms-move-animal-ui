import { QuestionPageController } from '~/src/server/common/controller/question-page-controller/question-page-controller.js'
import { TbStateManager } from '../common/model/state/state-manager.js'

export class TbQuestionPageController extends QuestionPageController {
  StateManager = TbStateManager
}
