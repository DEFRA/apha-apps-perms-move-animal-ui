import { CacheService } from "@defra/forms-engine-plugin/cache-service.js";
import { TbStateManager } from "~/src/server/tb/state-manager.js";
import { getFormContext } from "./form-context.js";
import { OriginSection } from "~/src/server/tb/origin/section.js";

export class CustomCacheService extends CacheService {
  StateService = TbStateManager

  async setState(request, state) {
    const result = await super.setState(request, state)
    const stateService = new TbStateManager(request)
    const section = await OriginSection.fromRequest(request, stateService.toState())
    stateService.setSection(section)
    return result
  }

}
