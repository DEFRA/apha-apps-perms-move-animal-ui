import { SectionModelV1 } from '../common/model/section/section-model/section-model.js'
import { ExoticsStateManager } from './state-manager.js'

export class ExoticsSectionModel extends SectionModelV1 {
  StateManager = ExoticsStateManager
}
