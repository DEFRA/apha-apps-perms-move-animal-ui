import { QuestionPageController } from '~/src/server/common/controller/question-page-controller/question-page-controller.js'
import { TbStateManager } from '~/src/server/tb/state-manager.js'

export class TbQuestionPageController extends QuestionPageController {
  StateManager = TbStateManager
}
