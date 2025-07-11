import { PageController } from '../../../common/controller/page-controller/page-controller.js'
import { BiosecurityMapAnswer } from '../../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { TbStateManager } from '~/src/server/tb/state-manager.js'
import { uploadPlanPage } from '../upload-plan/index.js'

export class SizeErrorPageController extends PageController {
  nextPage() {
    return { urlPath: '/tb/submit/check-answers' }
  }

  handlePost(req, h) {
    const applicationState = new TbStateManager(req).toState()
    const uploadPlan = /** @type {BiosecurityMapAnswer} */ (
      BiosecurityMapAnswer.fromState(
        applicationState['biosecurity-map']['upload-plan']
      )
    )
    if (uploadPlan.value?.status) {
      uploadPlan.value.status.uploadStatus = 'skipped'
    }

    const state = new TbStateManager(req)
    state.set(uploadPlanPage, uploadPlan)

    return h.redirect(this.nextPage().urlPath)
  }
}
