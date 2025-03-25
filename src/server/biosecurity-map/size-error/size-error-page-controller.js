import { submitSummaryPage } from '../../check-answers/index.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { BiosecurityMapAnswer } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { StateManager } from '../../common/model/state/state-manager.js'
import { uploadPlanPage } from '../upload-plan/index.js'

export class SizeErrorPageController extends PageController {
  nextPage() {
    return submitSummaryPage
  }

  handlePost(req, h) {
    const applicationState = new StateManager(req).toState()
    const uploadPlan = /** @type {BiosecurityMapAnswer} */ (
      BiosecurityMapAnswer.fromState(
        applicationState['biosecurity-map']['upload-plan']
      )
    )
    if (uploadPlan.value?.status) {
      uploadPlan.value.status.uploadStatus = 'skipped'
    }

    const state = new StateManager(req)
    state.set(uploadPlanPage, uploadPlan)

    return h.redirect(this.nextPage().urlPath)
  }
}
