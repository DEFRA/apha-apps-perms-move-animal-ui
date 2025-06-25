import { SectionModel } from '../../common/model/section/section-model/section-model.js'
import { exoticAboutSummary } from './check-answers/index.js'
import { exoticDescribeWhatYouAreMoving } from './describe-what-you-are-moving/index.js'
import { exoticHowMuchAreYouMoving } from './how-much-are-you-moving/index.js'
import {
  exoticTypeOfMovement,
  exoticTypeOfMovementPage
} from './type-of-movement/index.js'
import { exoticWhatAreYouMovingAdditional } from './what-are-you-moving-additional/index.js'
import { exoticWhatAreYouMoving } from './what-are-you-moving/index.js'

/**
 * @import {SectionConfig} from '../../common/model/section/section-model/section-model.js'
 */

const plugin = {
  plugin: {
    name: 'about',
    async register(server) {
      await server.register([
        exoticTypeOfMovement,
        exoticWhatAreYouMoving,
        exoticWhatAreYouMovingAdditional,
        exoticHowMuchAreYouMoving,
        exoticDescribeWhatYouAreMoving,
        exoticAboutSummary
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
    summaryLink: '/exotic/about/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => exoticTypeOfMovementPage
}
