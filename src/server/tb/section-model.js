import { TbStateManager } from '~/src/server/tb/state-manager.js'
import { SectionModel } from '../common/model/section/section-model/section-model.js'

export class TbSectionModel extends SectionModel {
  StateManager = TbStateManager
}
