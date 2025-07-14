import { ExitPage } from './exit-page-model.js'

/** @import { AnswerModel } from '../answer/answer-model.js' */
/** @import { Page } from './page-model.js' */

/** @typedef {{ page: Page, answer: AnswerModel}}  IndirectActionConfig */

export class ActionableExitPage extends ExitPage {
  /** @type {IndirectActionConfig} */
  _indirectAction

  /** @type {IndirectActionConfig} */
  get indirectAction() {
    return this._indirectAction
  }
}
