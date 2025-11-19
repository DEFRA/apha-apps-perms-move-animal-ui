/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { FmdSectionModel } from '../section-model.js'
import { animalSlaughtered } from './animal-slaughtered/index.js'
import { checkAnswers } from './check-answers/index.js'
import { animalIds } from './animal-ids/index.js'
import {
  movementActivityType,
  movementActivityTypePage
} from './movement-activity-type/index.js'
import { slaughteredNumber } from './slaughtered-number/index.js'
import { whatIsMoving } from './what-is-moving/index.js'
import { moveToSlaughter } from './move-to-slaughter/index.js'
import { typeOfAnimals } from './type-of-animals/index.js'
import { numberOfAnimals } from './number-of-animals/index.js'
import { movementOnExit } from './movement-on-exit/index.js'
import { milkWhoIsMoving } from './milk-who-is-moving/index.js'
import { milkAnimal } from './milk-animal/index.js'
import { animalIdsSlaughter } from './animal-ids-slaughter/index.js'

const plugin = {
  plugin: {
    name: 'fmd-about',
    async register(server) {
      await server.register([
        movementActivityType,
        animalSlaughtered,
        slaughteredNumber,
        animalIds,
        animalIdsSlaughter,
        whatIsMoving,
        moveToSlaughter,
        typeOfAnimals,
        numberOfAnimals,
        movementOnExit,
        milkWhoIsMoving,
        milkAnimal,
        checkAnswers
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

  static firstPageFactory = () => movementActivityTypePage
}
