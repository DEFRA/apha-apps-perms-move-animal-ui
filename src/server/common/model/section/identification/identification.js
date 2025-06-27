import { TbSectionModel } from '../../../../tb/section-model.js'
import { OriginSection } from '../origin/origin.js'
import { DestinationSection } from '../destination/destination.js'
import { identification } from '~/src/server/tb/identification/index.js'
import { OriginTypeAnswer } from '../../answer/origin-type/origin-type.js'
import { DestinationTypeAnswer } from '../../answer/destination-type/destination-type.js'
import { calvesUnder42DaysOldPage } from '~/src/server/tb/identification/calves-under-42-days-old/index.js'

/** @import {SectionConfig} from '../../../../tb/section-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {RawApplicationState} app */
const isVisible = (app) => {
  const isOnFarm = app.origin?.onOffFarm === 'on'
  const originValid = OriginSection.fromState(app).validate().isValid
  const destinationValid = DestinationSection.fromState(app).validate().isValid

  return (
    originValid &&
    destinationValid &&
    isOnFarm &&
    OriginTypeAnswer.isTbRestricted(app.origin?.originType) &&
    DestinationTypeAnswer.isTbRestricted(app.destination?.destinationType)
  )
}

export class IdentificationSection extends TbSectionModel {
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
