/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { NotImplementedError } from '../../common/helpers/not-implemented-error.js'
import { ExoticsSectionModel } from '../section-model.js'
import { enterWhatIsMoving } from './enter-what-is-moving/index.js'
import { movementType } from './movement-type/index.js'
import { whatIsMoving } from './what-is-moving/index.js'

const plugin = {
  plugin: {
    name: 'exotics-about',
    async register(server) {
      await server.register([movementType, whatIsMoving, enterWhatIsMoving])
    }
  }
}

export class AboutSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'about',
    title: 'About the movement',
    plugin,
    summaryLink: '/exotics/about/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => {
    throw new NotImplementedError()
  }
}
