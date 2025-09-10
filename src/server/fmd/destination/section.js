/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '../../common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { abattoirAddress } from './abattoir-address/index.js'
import { abattoirName, abattoirNamePage } from './abattoir-name/index.js'
import { applicantMovingCarcasses } from './applicant-moving-carcasses/index.js'
import {
  carcassesDestinationType,
  carcassesDestinationTypePage
} from './carcasses-destination-type/index.js'
import { carcassesSomewhereElse } from './carcasses-somewhere-else/index.js'
import { checkAnswers } from './check-answers/index.js'
import {
  companySellingMilkTo,
  companySellingMilkToPage
} from './company-selling-milk-to/index.js'
import { destinationBusinessPhone } from './destination-business-phone/index.js'
import { destinationBusinessName } from './destination-business-name/index.js'
import { thirdPartyMoving } from './third-party-moving/index.js'
import { willMoveToTla, willMoveToTlaPage } from './will-move-to-tla/index.js'
import { destinationAddressKnown } from './destination-address-known/index.js'
import { removingBusinessAddress } from './removing-business-address/index.js'

const plugin = {
  plugin: {
    name: 'fmd-destination',
    async register(server) {
      await server.register([
        abattoirName,
        abattoirAddress,
        carcassesDestinationType,
        carcassesSomewhereElse,
        applicantMovingCarcasses,
        thirdPartyMoving,
        destinationBusinessName,
        destinationBusinessPhone,
        destinationAddressKnown,
        removingBusinessAddress,
        willMoveToTla,
        companySellingMilkTo,
        checkAnswers
      ])
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
