import { SectionModel } from '../section-model/section-model.js'
import { OriginSection } from '../origin/origin.js'
import { DestinationSection } from '../destination/destination.js'
import { identification } from '~/src/server/identification/index.js'
import { OriginTypeAnswer } from '../../answer/origin-type/origin-type.js'
import { DestinationTypeAnswer } from '../../answer/destination-type/destination-type.js'
import { calvesUnder42DaysOldPage } from '~/src/server/identification/calves-under-42-days-old/index.js'
import { config } from '~/src/config/config.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {RawApplicationState} app */
const isVisible = (app) => {
  const isOnFarm = app.origin?.onOffFarm === 'on'
  const originValid = OriginSection.fromState(app).validate().isValid
  const destinationValid = DestinationSection.fromState(app).validate().isValid
  return (
    config.get('featureFlags').animalIdentifiers &&
    originValid &&
    destinationValid &&
    isOnFarm &&
    OriginTypeAnswer.isTbRestricted(app.origin?.originType) &&
    DestinationTypeAnswer.isTbRestricted(app.destination?.destinationType)
  )
}

export class IdentificationSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'identification',
    title: 'Animal identification',
    plugin: identification,
    summaryLink: '/identification/check-answers',
    isEnabled: () => true,
    isVisible
  }

  static firstPageFactory = () => calvesUnder42DaysOldPage
}
