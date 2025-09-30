/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { checkAnswers } from './check-answers/index.js'
import { FmdSectionModel } from '../section-model.js'
import { AboutSection } from '../about/section.js'
import { tla, tlaPage } from './tla/index.js'
import { premisesType, premisesTypePage } from './premises-type/index.js'
import { cphNumber } from './cph-number/index.js'
import { originAddress } from './origin-address/index.js'
import { gridRef } from './grid-ref/index.js'
import { tcphNumber } from './tcph-number/index.js'
import { whatAnimals } from './what-animals/index.js'
import { clovenHooved } from './cloven-hooved/index.js'

const plugin = {
  plugin: {
    name: 'fmd-origin',
    async register(server) {
      await server.register([
        checkAnswers,
        tla,
        premisesType,
        cphNumber,
        originAddress,
        gridRef,
        tcphNumber,
        whatAnimals,
        clovenHooved
      ])
    }
  }
}

const isVisibleAndEnabled = (context) => {
  return (
    AboutSection.fromState(context).validate().isValid &&
    (context.about.whatIsMoving !== 'milk' ||
      context.about.milkWhoIsMoving !== 'dairy')
  )
}

export class OriginSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin,
    summaryLink: '/fmd/movement-origin/check-answers',
    isEnabled: isVisibleAndEnabled,
    isVisible: isVisibleAndEnabled
  }

  static firstPageFactory = (context) => {
    if (context.about?.whatIsMoving === 'milk') {
      return premisesTypePage
    }
    return tlaPage
  }
}
