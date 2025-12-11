import { CacheService } from '@defra/forms-engine-plugin/cache-service.js'
import { TbStateManager } from '~/src/server/tb/state-manager.js'
import { OriginSection } from '~/src/server/tb/origin/section.js'

/**
 * @import { SectionModelV2 } from '~/src/server/common/model/section/section-model/section-model-v2.js'
 */

export class CustomCacheService extends CacheService {
  StateService = TbStateManager

  async setState(request, state) {
    const result = await super.setState(request, state)
    const stateService = new TbStateManager(request)
    const section = /** @type {SectionModelV2} */ (
      await OriginSection.fromRequest(request, stateService.toState())
    )

    stateService.setSection(section)
    return result
  }
}
