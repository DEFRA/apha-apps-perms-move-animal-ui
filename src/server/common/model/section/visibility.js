import { OriginSection } from '../../../tb/origin/section.js'
import { DestinationSection } from '../../../tb/destination/section.js'
import { OriginTypeAnswer } from '../answer/origin-type/origin-type.js'
import { DestinationTypeAnswer } from '../answer/destination-type/destination-type.js'

/**
 * @import {Request} from '@hapi/hapi'
 * @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js'
 */

/**
 * @param {RawApplicationState} app
 * @param {Request} [req]
 */
export const biosecuritySectionIsVisible = async (app, req) => {
  if (!req) {
    return false
  }
  const origin = await OriginSection.fromRequest(req, app)
  const destination = await DestinationSection.fromRequest(req, app)
  const originData = origin.sectionData.questionAnswers
  const destinationData = destination.sectionData.questionAnswers

  const movementOnOff = originData.find((q) => q.questionKey === 'onOffFarm')
    ?.answer.value
  const isMovementOn = movementOnOff === 'on'
  const isMovementOff = movementOnOff === 'off'

  const originType = originData.find((q) => q.questionKey === 'originType')
    ?.answer.value
  const destinationType = destinationData.find(
    (q) => q.questionKey === 'destinationType'
  )?.answer.value
  const isDestinationNotAfu = destinationType !== 'afu'
  const bothTbRestricted =
    OriginTypeAnswer.isTbRestricted(originType) &&
    DestinationTypeAnswer.isTbRestricted(destinationType)
  const ownBothOriginAndDestination = destinationData.some(
    (q) =>
      q.questionKey === 'ownBothOriginAndDestination' &&
      q.answer.value === 'yes'
  )

  return (
    origin.validate().isValid &&
    destination.validate().isValid &&
    ((isMovementOn && isDestinationNotAfu) ||
      (isMovementOff && bothTbRestricted && ownBothOriginAndDestination))
  )
}
