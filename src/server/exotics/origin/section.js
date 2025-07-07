/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { checkAnswers } from './check-answers/index.js'
import { ExoticsSectionModel } from '../section-model.js'
import {
  typeOfAnimalLocation,
  typeOfAnimalLocationPage
} from './type-of-animal-location/index.js'
import {
  typeOfProductLocation,
  typeOfProductLocationPage
} from './type-of-product-location/index.js'
import { productLocationHasACphNumber } from './product-location-has-a-cph-number/index.js'
import { AboutSection } from '../about/section.js'
import { productLocationCphNumber } from './product-location-cph-number/index.js'

const plugin = {
  plugin: {
    name: 'exotics-origin',
    async register(server) {
      await server.register([
        checkAnswers,
        typeOfAnimalLocation,
        typeOfProductLocation,
        productLocationHasACphNumber,
        productLocationCphNumber
      ])
    }
  }
}

export class OriginSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin,
    summaryLink: '/exotics/movement-origin/check-answers',
    isEnabled: (state) =>
      AboutSection.fromState(state).validate().isValid &&
      state.about?.movementType !== 'visit',
    isVisible: (state) =>
      AboutSection.fromState(state).validate().isValid &&
      state.about.movementType !== 'visit'
  }

  static firstPageFactory = (state) => {
    if (state.about.whatIsMoving === 'live-animals') {
      return typeOfAnimalLocationPage
    }

    return typeOfProductLocationPage
  }
}
