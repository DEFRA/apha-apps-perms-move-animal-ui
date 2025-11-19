import { SectionModelV1 } from '../common/model/section/section-model/section-model.js'
import { FmdStateManager } from './state-manager.js'

export class FmdSectionModel extends SectionModelV1 {
  StateManager = FmdStateManager
}
