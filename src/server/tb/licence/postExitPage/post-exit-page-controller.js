import { PageController } from '../../../common/controller/page-controller/page-controller.js'
import { ReceiveMethodAnswer } from '../../../common/model/answer/receiveMethod/receiveMethod.js'
import { TbStateManager } from '../../../common/model/state/state-manager.js'
import { emailAddressPage } from '../email-address/index.js'
import { receiveMethodPage } from '../receiveMethod/index.js'

export class PostExitPageController extends PageController {
  nextPage() {
    return emailAddressPage
  }

  handlePost(req, h) {
    const answer = ReceiveMethodAnswer.fromState(req.payload.receiveMethod)

    const state = new TbStateManager(req)
    state.set(receiveMethodPage, answer)

    return h.redirect(this.nextPage().urlPath)
  }
}
