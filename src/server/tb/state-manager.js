import { StateManager } from '../common/model/state/state-manager.js'

export class TbStateManager extends StateManager {
  get key() {
    return 'application'
  }
}
