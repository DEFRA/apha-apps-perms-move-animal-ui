import { OriginSection } from '../../../tb/origin/section.js'
import { DestinationSection } from '../../../tb/destination/section.js'

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

  const isMovementOn = originData.some(
    (q) => q.questionKey === 'onOffFarm' && q.answer.value === 'on'
  )
  const isDestinationNotAfu = destinationData.some(
    (q) => q.questionKey === 'destinationType' && q.answer.value !== 'afu'
  )

  return (
    isMovementOn &&
    origin.validate().isValid &&
    destination.validate().isValid &&
    isDestinationNotAfu
  )
}
