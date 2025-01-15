import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { ReceiveMethodAnswer } from '../../common/model/answer/receiveMethod/receiveMethod.js'
import { emailAddressPage } from '../email-address/index.js'
import { receiveMethodPage } from '../receiveMethod/index.js'

export class PostExitPageController extends PageController {
  nextPage() {
    return emailAddressPage
  }

  postHandler(req, h) {
    const answer = ReceiveMethodAnswer.fromState(req.payload.receiveMethod)

    req.yar.set(receiveMethodPage.sectionKey, {
      ...req.yar.get(receiveMethodPage.sectionKey),
      [receiveMethodPage.questionKey]: answer.toState()
    })
    return h.redirect(this.nextPage().urlPath)
  }
}
