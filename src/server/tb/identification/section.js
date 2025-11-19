import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
import { OriginSection } from '../origin/section.js'
import { DestinationSection } from '../destination/section.js'
import { identification } from '~/src/server/tb/identification/index.js'
import { OriginTypeAnswer } from '../../common/model/answer/origin-type/origin-type.js'
import { DestinationTypeAnswer } from '../../common/model/answer/destination-type/destination-type.js'
import { calvesUnder42DaysOldPage } from '~/src/server/tb/identification/calves-under-42-days-old/index.js'
import { earTagsPage } from './ear-tags/index.js'
import { testingDatesPage } from './testing-dates/index.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {RawApplicationState} app */
const isVisible = async (app, req) => {
  const origin = await OriginSection.fromRequest(req, app)
  const originData = origin.sectionData.questionAnswers

  const isOnFarm = originData.includes(q => (q.questionKey === 'onOffFarm') && (q.answer.value === 'Yes'))
  const isOffFarmIsoUnit = originData.includes(q => (q.questionKey === 'originType') && (q.answer.value === 'iso-unit'))
  const originType = originData.find(q => q.questionKey === 'originType')?.at(0)

  const originValid = origin.validate().isValid
  const destinationValid = DestinationSection.fromState(app).validate().isValid
  const bothTbRestricted =
    OriginTypeAnswer.isTbRestricted(originType) &&
    DestinationTypeAnswer.isTbRestricted(app.destination?.destinationType)

  return (
    originValid &&
    destinationValid &&
    ((isOnFarm && bothTbRestricted) || isOffFarmIsoUnit)
  )
}

export class IdentificationSection extends SectionModelV1 {
  /** @type {SectionConfig} */
  static config = {
    key: 'identification',
    title: 'Animal identification',
    plugin: identification,
    summaryLink: '/identification/check-answers',
    isEnabled: () => true,
    isVisible
  }

  static firstPageFactory = (context) => {
    if (
      context.origin?.onOffFarm === 'off' &&
      context.origin?.originType === 'iso-unit'
    ) {
      if (context.destination?.destinationType === 'slaughter') {
        return earTagsPage
      }

      if (context.destination?.destinationType === 'afu') {
        return testingDatesPage
      }
    }

    return calvesUnder42DaysOldPage
  }
}
