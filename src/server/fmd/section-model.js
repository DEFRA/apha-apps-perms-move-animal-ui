import { SectionModelV1 } from '../common/model/section/section-model/section-model-v1.js'
import { FmdStateManager } from './state-manager.js'

export class FmdSectionModel extends SectionModelV1 {
  StateManager = FmdStateManager
}
