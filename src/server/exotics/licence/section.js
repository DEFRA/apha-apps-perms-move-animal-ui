/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '../../common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { ExoticsSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { email } from './email/index.js'
import { keeperName, keeperNamePage } from './keeper-name/index.js'
import {
  originResponsiblePersonName,
  originResponsiblePersonNamePage
} from './origin-responsible-person-name/index.js'
import {
  visitResponsiblePersonName,
  visitResponsiblePersonNamePage
} from './visit-responsible-person-name/index.js'

const plugin = {
  plugin: {
    name: 'exotics-licence',
    async register(server) {
      await server.register([
        visitResponsiblePersonName,
        originResponsiblePersonName,
        keeperName,
        email,
        checkAnswers
      ])
    }
  }
}

export class LicenceSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'licence',
    title: 'Receiving the licence',
    plugin,
    summaryLink: '/exotics/receiving-the-licence/check-answers',
    isEnabled: (context) => AboutSection.fromState(context).validate().isValid,
    isVisible: () => true
  }

  /** @param {RawApplicationState} context */
  static firstPageFactory = (context) => {
    if (context.about?.movementType === 'visit') {
      return visitResponsiblePersonNamePage
    }

    if (context.about?.whatIsMoving === 'live-animals') {
      return keeperNamePage
    }

    return originResponsiblePersonNamePage
  }
}
