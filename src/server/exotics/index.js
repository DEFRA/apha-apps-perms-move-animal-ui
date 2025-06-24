/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { ApplicationModelAbstract } from '../common/model/application/application.js'
import { ExoticAboutSection } from './about-the-movement/section-model.js'

class ExoticsApplicationModel extends ApplicationModelAbstract {
  static implementedSections = [
    ExoticAboutSection
  ]
}
/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exotics = {
  plugin: {
    name: 'exotics',
    async register(server) {
      server.register(
        ExoticsApplicationModel.implementedSections.map(
          (section) => section.config.plugin
        )
      )
    }
  }
}
