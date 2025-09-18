/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { collectionPremises } from './collection-premises/index.js'
import { dairyName } from './dairy-name/index.js'
import { disposalDate, disposalDatePage } from './disposal-date/index.js'
import { driverName } from './driver-name/index.js'
import { driverPhone } from './driver-phone/index.js'
import { expectMovementDate } from './expect-movement-date/index.js'
import { maxJourneys } from './max-journeys/index.js'
import {
  maximumDaysAnimals,
  maximumDaysAnimalsPage
} from './maximum-days-animals/index.js'
import { maximumJourneysMilk } from './maximum-journeys-milk/index.js'
import { milkMovementDate } from './milk-movement-date/index.js'
import { movementEnd } from './movement-end/index.js'
import { movementStart } from './movement-start/index.js'
import { twoWeekRepeat, twoWeekRepeatPage } from './two-week-repeat/index.js'
import { vehicleNumber } from './vehicle-number/index.js'

const plugin = {
  plugin: {
    name: 'fmd-movementDetails',
    async register(server) {
      await server.register([
        checkAnswers,
        disposalDate,
        maximumDaysAnimals,
        maxJourneys,
        movementStart,
        movementEnd,
        expectMovementDate,
        maximumJourneysMilk,
        milkMovementDate,
        twoWeekRepeat,
        collectionPremises,
        driverPhone,
        driverName,
        vehicleNumber,
        dairyName
      ])
    }
  }
}

export const isVisibleAndEnabled = (context) =>
  AboutSection.fromState(context).validate().isValid &&
  context.about.movementActivityType !== 'slaughter-onsite'

export class MovementDetailsSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'movement',
    title: 'Movement details',
    plugin,
    summaryLink: '/fmd/movement-details/check-answers',
    isEnabled: isVisibleAndEnabled,
    isVisible: isVisibleAndEnabled
  }

  static firstPageFactory = (context) => {
    if (context.about?.whatIsMoving === 'milk') {
      return twoWeekRepeatPage
    }

    if (context.about?.whatIsMoving === 'live-animals') {
      return maximumDaysAnimalsPage
    }

    return disposalDatePage
  }
}
