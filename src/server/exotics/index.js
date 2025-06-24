/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { ApplicationModelAbstract } from '../common/model/application/application.js'

class ExoticsApplicationModel extends ApplicationModelAbstract {
  static implementedSections = []
}
/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exotics = {
  plugin: {
    name: 'receiving-the-licence',
    async register(server) {
      server.register(
        ExoticsApplicationModel.implementedSections.map(
          (section) => section.config.plugin
        )
      )
    }
  }
}



