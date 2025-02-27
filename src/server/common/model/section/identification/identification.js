import { SectionModel } from '../section-model/section-model.js'
import { config } from '~/src/config/config.js'
import { identification } from '~/src/server/identification/index.js'
import { earTagsPage } from '~/src/server/identification/ear-tags/index.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {string} premisesType */
const isTbRestricted = (premisesType) =>
  ['zoo', 'tb-restricted-farm'].includes(premisesType)

/** @param {RawApplicationState} app */
const isVisible = (app) => {
  const isOnFarm = app.origin?.onOffFarm === 'on'
  const isBiosecurityFlag = config.get('featureFlags')?.biosecurity
  return (
    isBiosecurityFlag &&
    isOnFarm &&
    isTbRestricted(app.origin?.originType) &&
    isTbRestricted(app.destination?.destinationType)
  )
}

export class IdentificationSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'identification',
    title: 'Animal identifiers',
    plugin: identification,
    summaryLink: '/identification/check-answers',
    isEnabled: () => true,
    isVisible
  }

  static firstPageFactory = () => earTagsPage
}
