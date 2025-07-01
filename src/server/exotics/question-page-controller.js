import { QuestionPageController } from '~/src/server/common/controller/question-page-controller/question-page-controller.js'
import { ExoticsStateManager } from './state-manager.js'

export class ExoticsQuestionPageController extends QuestionPageController {
  StateManager = ExoticsStateManager
}
