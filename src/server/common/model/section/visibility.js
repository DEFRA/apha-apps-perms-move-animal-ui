import { OriginSection } from '../../../tb/origin/section.js'
import { DestinationSection } from '../../../tb/destination/section.js'

/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {RawApplicationState} app */
export const biosecuritySectionIsVisible = (app) => {
  const isDestinationNotAfu = app.destination?.destinationType !== 'afu'
  const isMovementOn = app.origin?.onOffFarm === 'on'
  return (
    isMovementOn &&
    OriginSection.fromRequest(app).validate().isValid &&
    DestinationSection.fromRequest(app).validate().isValid &&
    isDestinationNotAfu
  )
}
