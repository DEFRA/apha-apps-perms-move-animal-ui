import { OriginSection } from './origin/origin.js'
import { DestinationSection } from './destination/destination.js'

/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {RawApplicationState} app */
export const biosecuritySectionIsVisible = (app) => {
  const isDestinationNotAfu = app.destination?.destinationType !== 'afu'
  const isMovementOn = app.origin?.onOffFarm === 'on'
  return (
    isMovementOn &&
    OriginSection.fromState(app).validate().isValid &&
    DestinationSection.fromState(app).validate().isValid &&
    isDestinationNotAfu
  )
}
