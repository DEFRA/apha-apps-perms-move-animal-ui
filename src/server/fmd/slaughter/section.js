/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import {
  slaughterOrKnackerman,
  slaughterOrKnackermanPage
} from './slaughter-or-knackerman/index.js'
import { slaughtermanName } from './slaughterman-name/index.js'

const plugin = {
  plugin: {
    name: 'fmd-slaughterInformation',
    async register(server) {
      await server.register([
        checkAnswers,
        slaughterOrKnackerman,
        slaughtermanName
      ])
    }
  }
}

const isVisibleAndEnabled = (context) => {
  return (
    AboutSection.fromState(context).validate().isValid &&
    context.about.movementActivityType === 'slaughter-onsite'
  )
}

export class SlaughterInformationSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'slaughter',
    title: 'Slaughter information',
    plugin,
    summaryLink: '/fmd/slaughter-information/check-answers',
    isEnabled: isVisibleAndEnabled,
    isVisible: isVisibleAndEnabled
  }

  static firstPageFactory = () => slaughterOrKnackermanPage
}
