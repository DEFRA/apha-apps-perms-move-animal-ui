/**
 * @import {ApplicationData} from '../model/application/application.js'
 */

import { config } from '~/src/config/config.js'
import { biosecurity } from '../../biosecurity/index.js'
import { BiosecuritySection } from '../model/section/biosecurity/biosecurity.js'

export class FeatureFlagHelper {
  /**
   * @param {string} flagName
   * @returns {boolean}
   */
  static get(flagName) {
    return config.get('featureFlags')?.[flagName] ?? false
  }

  /**
   * @returns {Array<string>}
   */
  static getSectionsBehindFeatureFlags(req) {
    const sections = []
    if (this.get('biosecurity')) {
      sections.push(BiosecuritySection.fromState(req.yar.get('biosecurity')))
    }
    return sections
  }

  /**
   * @param {ApplicationData | undefined} state
   * @returns {Partial<ApplicationData>}
   */
  static getAppplicationStatesBehindFeatureFlags(state) {
    const states = {}
    if (this.get('biosecurity')) {
      states.biosecurity = BiosecuritySection.fromState(state?.biosecurity)
    }
    return states
  }

  /**
   * @returns {Array<ServerRegisterPluginObject<void>>}
   */
  static getRoutesBehindFeatureFlags() {
    const routes = []
    if (this.get('biosecurity')) {
      routes.push(biosecurity)
    }
    return routes
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
