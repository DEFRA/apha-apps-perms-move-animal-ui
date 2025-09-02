/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { animalsId } from './animals-id/index.js'
import { currentPurposeOfAnimals } from './current-purpose-of-animals/index.js'
import { enterWhatIsMovingQuantity } from './enter-what-is-moving-quantity/index.js'
import { enterWhatIsMoving } from './enter-what-is-moving/index.js'
import { movementType, movementTypePage } from './movement-type/index.js'
import { numberOfAnimals } from './number-of-animals/index.js'
import { typeOfAnimalOther } from './type-of-animal-other/index.js'
import { typeOfAnimal } from './type-of-animal/index.js'
import { whatIsMoving } from './what-is-moving/index.js'
import { typeOfBird } from './type-of-bird/index.js'
import { typeOfBirdUncommon } from './type-of-bird-uncommon/index.js'
import { typeOfBirdOther } from './type-of-bird-other/index.js'
import { aboutMovementExit } from './about-movement-exit-page/index.js'

const plugin = {
  plugin: {
    name: 'fmd-about',
    async register(server) {
      await server.register([
        movementType,
        whatIsMoving,
        enterWhatIsMoving,
        enterWhatIsMovingQuantity,
        typeOfAnimal,
        typeOfAnimalOther,
        numberOfAnimals,
        currentPurposeOfAnimals,
        animalsId,
        checkAnswers,
        typeOfBird,
        typeOfBirdUncommon,
        typeOfBirdOther,
        aboutMovementExit
      ])
    }
  }
}

export class AboutSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'about',
    title: 'About the movement',
    plugin,
    summaryLink: '/fmd/about-the-movement/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => movementTypePage
}
