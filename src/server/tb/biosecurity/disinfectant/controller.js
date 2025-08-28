import { TbQuestionPageController } from '../../question-page-controller.js'
import { TbStateManager } from '../../state-manager.js'
import { disinfectantDilutionPage } from '../disinfectant-dilution/index.js'

export class DisinfectantPageController extends TbQuestionPageController {
  handlePost(req, h) {
    const state = new TbStateManager(req)
    const applicationState = state.toState()
    // clear the dilution page answer if the user has changed the disinfectant
    if (
      applicationState?.biosecurity?.disinfectant !== req.payload.disinfectant
    ) {
      state.set(disinfectantDilutionPage, undefined)
    }

    return super.handlePost(req, h)
  }
}
