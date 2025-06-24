import { NotImplementedError } from '../../common/helpers/not-implemented-error.js'
import { SectionModel } from '../../common/model/section/section-model/section-model.js'
import { exoticTypeOfMovement } from './type-of-movement/index.js'

/**
 * @import {SectionConfig} from '../../common/model/section/section-model/section-model.js'
 */

const plugin = {
  plugin: {
    name: 'about',
    async register(server) {
      await server.register([
        exoticTypeOfMovement
      ])
    }
  }
}

export class ExoticAboutSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'about',
    title: 'About the movement',
    plugin: plugin,
    summaryLink: '/exotics/about-the-movement/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => { throw new NotImplementedError() } // TODO
}
