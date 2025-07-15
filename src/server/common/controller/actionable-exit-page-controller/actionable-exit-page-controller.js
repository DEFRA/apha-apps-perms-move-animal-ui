import { PageController } from '../page-controller/page-controller.js'

/** @import { StateManager } from '~/src/server/common/model/state/state-manager.js' */
/** @import { ActionableExitPage } from '~/src/server/common/model/page/actionable-exit-page-model.js' */

export class ActionableExitPageController extends PageController {
  /** @type {typeof StateManager} */
  StateManager

  /**
   * @param {ActionableExitPage} page
   */
  constructor(page, options) {
    super(page, options)
    this.page = page
  }

  handlePost(req, h) {
    const state = new this.StateManager(req)
    state.set(this.page.indirectAction.page, this.page.indirectAction.answer)

    return h.redirect(this.page.nextPage().urlPath)
  }
}
