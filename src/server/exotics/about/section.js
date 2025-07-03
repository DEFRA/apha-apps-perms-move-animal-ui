/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { NotImplementedError } from '../../common/helpers/not-implemented-error.js'
import { ExoticsSectionModel } from '../section-model.js'
import { enterWhatIsMovingDescription } from './enter-what-is-moving-description/index.js'
import { enterWhatIsMovingQuantity } from './enter-what-is-moving-quantity/index.js'
import { enterWhatIsMoving } from './enter-what-is-moving/index.js'
import { movementType } from './movement-type/index.js'
import { numberOfAnimals } from './number-of-animals/index.js'
import { typeOfAnimalOther } from './type-of-animal-other/index.js'
import { typeOfAnimal } from './type-of-animal/index.js'
import { whatIsMoving } from './what-is-moving/index.js'

const plugin = {
  plugin: {
    name: 'exotics-about',
    async register(server) {
      await server.register([
        movementType,
        whatIsMoving,
        enterWhatIsMoving,
        enterWhatIsMovingQuantity,
        enterWhatIsMovingDescription,
        typeOfAnimal,
        typeOfAnimalOther,
        numberOfAnimals
      ])
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
