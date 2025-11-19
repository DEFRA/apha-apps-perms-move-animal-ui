import { SectionModelV1 } from '../common/model/section/section-model/section-model-v1.js'
import { ExoticsStateManager } from './state-manager.js'

export class ExoticsSectionModel extends SectionModelV1 {
  StateManager = ExoticsStateManager
}
