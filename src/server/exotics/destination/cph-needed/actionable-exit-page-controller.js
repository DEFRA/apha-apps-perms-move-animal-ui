import { PageController } from '../../../common/controller/page-controller/page-controller.js'
import { ReceiveMethodAnswer } from '../../../common/model/answer/receiveMethod/receiveMethod.js'
import { cphNumberPage } from '../cph-number/index.js'
import { ExoticsStateManager } from '../../state-manager.js'
import { cphNumberKnownPage } from '../cph-number-known/index.js'

export class ActionablePageController extends PageController {
  nextPage() {
    return cphNumberPage
  }

  handlePost(req, h) {
    const answer = ReceiveMethodAnswer.fromState(req.payload.cphNumberKnown)

    const state = new ExoticsStateManager(req)
    state.set(cphNumberKnownPage, answer)

    return h.redirect(this.nextPage().urlPath)
  }
}
