import { OriginSection } from '../../../tb/origin/section.js'
import { DestinationSection } from '../../../tb/destination/section.js'

/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {RawApplicationState} app */
export const biosecuritySectionIsVisible = async (app, req) => {
  const origin = await OriginSection.fromRequest(req, app)
  const isDestinationNotAfu = app.destination?.destinationType !== 'afu'
  const originData = origin.sectionData.questionAnswers

  const isMovementOn = originData.some(q => (q.questionKey === 'onOffFarm') && (q.answer.value === 'on'))
  return (
    isMovementOn &&
    origin.validate().isValid &&
    DestinationSection.fromState(app).validate().isValid &&
    isDestinationNotAfu
  )
}
