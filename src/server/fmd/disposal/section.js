/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { disposalDate } from './disposal-date/index.js'
import {
  disposalWholeAnimal,
  disposalWholeAnimalPage
} from './disposal-whole-animal/index.js'

const plugin = {
  plugin: {
    name: 'fmd-disposal',
    async register(server) {
      await server.register([disposalWholeAnimal, disposalDate, checkAnswers])
    }
  }
}

const isVisibleAndEnabled = (context) => {
  return (
    AboutSection.fromState(context).validate().isValid &&
    context.about.movementActivityType === 'slaughter-onsite'
  )
}

export class DisposalSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'disposal',
    title: 'Disposal of the animal',
    plugin,
    summaryLink: '/fmd/disposal-of-the-animal/check-answers',
    isEnabled: isVisibleAndEnabled,
    isVisible: isVisibleAndEnabled
  }

  static firstPageFactory = () => disposalWholeAnimalPage
}
