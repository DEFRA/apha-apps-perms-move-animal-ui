/** @import {Request} from "@hapi/hapi/lib/types/request.js" */

/**
 * @typedef {Record<string, any>} RawSectionState
 * @typedef {Record<string, RawSectionState>} RawApplicationState
 */

const sectionKeys = [
  'origin',
  'destination',
  'licence',
  'identification',
  'biosecurity',
  'biosecurity-map'
]

export class StateManager {
  /** @param {Request} request */
  constructor(request) {
    this._request = request
  }

  /** @returns {RawApplicationState} */
  toState() {
    return Object.fromEntries(
      sectionKeys
        .map((key) => [key, this._request.yar.get(key)])
        .filter((entry) => entry.at(1) !== null)
    )
  }
}
