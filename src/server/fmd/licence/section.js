/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '../../common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { emailAddress } from './email-address/index.js'
import { originResponsiblePersonNamePage } from './origin-responsible-person-name/index.js'
import {
  registeredKeeperName,
  registeredKeeperNamePage
} from './registered-keeper-name/index.js'

const plugin = {
  plugin: {
    name: 'fmd-licence',
    async register(server) {
      await server.register([registeredKeeperName, emailAddress, checkAnswers])
    }
  }
}

export class LicenceSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'licence',
    title: 'Receiving the licence',
    plugin,
    summaryLink: '/fmd/receiving-the-licence/check-answers',
    isEnabled: (context) => AboutSection.fromState(context).validate().isValid,
    isVisible: () => true
  }

  /** @param {RawApplicationState} context */
  static firstPageFactory = (context) => {
    if (context.about?.whatIsMoving === 'milk') {
      return originResponsiblePersonNamePage
    }
    return registeredKeeperNamePage
  }
}
