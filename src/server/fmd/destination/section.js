/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '../../common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { abattoirNamePage } from './abattoir-name/index.js'
import { carcassesDestinationTypePage } from './carcasses-destination-type/index.js'
import { checkAnswers } from './check-answers/index.js'
import { companySellingMilkToPage } from './company-selling-milk-to/index.js'
import { willMoveToTlaPage } from './will-move-to-tla/index.js'

const plugin = {
  plugin: {
    name: 'fmd-destination',
    async register(server) {
      await server.register([checkAnswers])
    }
  }
}

const isVisibleAndEnabled = (context) => {
  return (
    AboutSection.fromState(context).validate().isValid &&
    context.about.movementActivityType !== 'slaughter-onsite'
  )
}

export class DestinationSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'destination',
    title: 'Movement destination',
    plugin,
    summaryLink: '/fmd/movement-destination/check-answers',
    isEnabled: isVisibleAndEnabled,
    isVisible: isVisibleAndEnabled
  }

  /** @param {RawApplicationState} context */
  static firstPageFactory = (context) => {
    if (context.about?.whatIsMoving === 'carcasses') {
      return carcassesDestinationTypePage
    }
    if (context.about?.whatIsMoving === 'live-animals') {
      if (context.about?.moveToSlaughter === 'yes') {
        return abattoirNamePage
      }
      return willMoveToTlaPage
    }
    return companySellingMilkToPage
  }
}
