import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'

/**
 * @import { ApplicationModel } from '~/src/server/common/model/application/application.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 */

/**
 * @param {ApplicationModel} application
 * @param {RawApplicationState} [state]
 * @returns {Promise<{statusCode: number | undefined, payload: any}>}
 */
export const submitApplication = async (application, state) => {
  if (config.get('featureFlags').prototypeMode) {
    return {
      statusCode: 200,
      payload: {
        message: 'EX-12AB-34CD'
      }
    }
  }

  const { baseUrl, timeout } = config.get('caseManagementApi')

  const payload = application.getCaseManagementData(state)

  const response = await Wreck.post(`${baseUrl}/submit`, {
    payload,
    timeout
  })

  return {
    statusCode: response.res.statusCode,
    payload: JSON.parse(response.payload)
  }
}
