import { StateManager } from '../common/model/state/state-manager.js'
import { FORMS_ENGINE_STATE_KEY } from '@defra/forms-engine-plugin/cache-service.js'

export class TbStateManager extends StateManager {
  get key() {
    return TbStateManager.key
  }

  static get key() {
    return 'application'
  }

  toState() {
    const state = super.toState()
    const formsEngineState =
      this._request.yar.get(FORMS_ENGINE_STATE_KEY) ?? {}

    const biosecurityState = formsEngineState?.biosecurity

    if (biosecurityState) {
      state.biosecurity = biosecurityState
    }

    return state
  }
}
