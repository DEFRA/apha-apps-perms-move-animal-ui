import { QuestionPageController } from '~/src/server/common/controller/question-page-controller/question-page-controller.js'
import { FmdStateManager } from './state-manager.js'

export class FmdQuestionPageController extends QuestionPageController {
  StateManager = FmdStateManager
}
