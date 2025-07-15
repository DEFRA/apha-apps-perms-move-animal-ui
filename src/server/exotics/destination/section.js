/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import { RawApplicationState } from '../../common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { ExoticsSectionModel } from '../section-model.js'
import { address } from './address/index.js'
import { checkAnswers } from './check-answers/index.js'
import { cphNeeded } from './cph-needed/index.js'
import { cphNumberKnown } from './cph-number-known/index.js'
import { cphNumber } from './cph-number/index.js'
import { responsiblePersonName } from './responsible-person-name/index.js'
import { typeOfLocation, typeOfLocationPage } from './type-of-location/index.js'

const plugin = {
  plugin: {
    name: 'exotics-destination',
    async register(server) {
      await server.register([
        checkAnswers,
        typeOfLocation,
        address,
        cphNumberKnown,
        cphNumber,
        responsiblePersonName,
        cphNeeded
      ])
    }
  }
}

/** @param {RawApplicationState} context */
const isVisibleAndEnabled = (context) =>
  AboutSection.fromState(context).validate().isValid &&
  context.about.movementType !== 'visit'

export class DestinationSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'destination',
    title: 'Movement destination',
    plugin,
    summaryLink: '/exotics/movement-destination/check-answers',
    isEnabled: isVisibleAndEnabled,
    isVisible: isVisibleAndEnabled
  }

  static firstPageFactory = () => typeOfLocationPage
}
