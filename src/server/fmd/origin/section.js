/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { checkAnswers } from './check-answers/index.js'
import { FmdSectionModel } from '../section-model.js'
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
import { animalLocationHasACphNumber } from './animal-location-has-a-cph-number/index.js'
import { areInField } from './are-in-field/index.js'
import { address } from './address/index.js'
import { cphNeeded } from './cph-needed/index.js'
import { fieldParcelNumber } from './field-parcel-number/index.js'
import { isDesignatedPremises } from './is-designated-premises/index.js'
import { latitudeAndLongitude } from './latitude-and-longitude/index.js'
import { animalLocationCphNumber } from './animal-location-cph-number/index.js'
import { typeOfAnimalLocationOther } from './type-of-animal-location-other/index.js'
import { animalsOnPremises } from './animals-on-premises/index.js'

const plugin = {
  plugin: {
    name: 'fmd-origin',
    async register(server) {
      await server.register([
        checkAnswers,
        typeOfAnimalLocation,
        typeOfProductLocation,
        productLocationHasACphNumber,
        productLocationCphNumber,
        animalLocationHasACphNumber,
        address,
        areInField,
        cphNeeded,
        fieldParcelNumber,
        isDesignatedPremises,
        latitudeAndLongitude,
        animalLocationCphNumber,
        typeOfAnimalLocationOther,
        animalsOnPremises
      ])
    }
  }
}

export class OriginSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin,
    summaryLink: '/fmd/movement-origin/check-answers',
    isEnabled: (state) =>
      AboutSection.fromState(state).validate().isValid &&
      state.about?.movementType !== 'visit',
    isVisible: (state) =>
      AboutSection.fromState(state).validate().isValid &&
      state.about.movementType !== 'visit'
  }

  static firstPageFactory = (state) => {
    if (state.about?.whatIsMoving === 'live-animals') {
      return typeOfAnimalLocationPage
    }

    return typeOfProductLocationPage
  }
}
