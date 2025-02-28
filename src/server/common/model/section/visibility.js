import { config } from '~/src/config/config.js'
import { OriginSection } from './origin/origin.js'
import { DestinationSection } from './destination/destination.js'

/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/** @param {RawApplicationState} app */
export const biosecuritySectionIsVisible = (app) => {
  const isBiosecurityFlag = config.get('featureFlags')?.biosecurity
  const isDestinationNotAfu = app.destination?.destinationType !== 'afu'
  const isMovementOn = app.origin?.onOffFarm === 'on'
  return (
    isBiosecurityFlag &&
    isMovementOn &&
    OriginSection.fromState(app).validate().isValid &&
    DestinationSection.fromState(app).validate().isValid &&
    isDestinationNotAfu
  )
}
