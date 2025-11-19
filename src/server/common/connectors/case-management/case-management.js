import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'

/** @import { ApplicationModel } from '~/src/server/common/model/application/application.js' */

/**
 * @param {ApplicationModel} application
 * @returns {Promise<{statusCode: number | undefined, payload: any}>}
 */
export const submitApplication = async (application) => {
  if (config.get('featureFlags').prototypeMode) {
    return {
      statusCode: 200,
      payload: {
        message: 'EX-12AB-34CD'
      }
    }
  }

  const { baseUrl, timeout } = config.get('caseManagementApi')

  console.log("CASE MANAGEMENT SUBMISSION", JSON.stringify(application.caseManagementData, null, 2))

  const response = await Wreck.post(`${baseUrl}/submit`, {
    payload: application.caseManagementData,
    timeout
  })

  return {
    statusCode: response.res.statusCode,
    payload: JSON.parse(response.payload)
  }
}
