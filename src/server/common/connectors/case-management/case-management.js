import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'

/** @import { ApplicationModel } from '../../model/application/application.js' */

/**
 * @param {ApplicationModel} application
 * @returns {Promise<{statusCode: number | undefined, payload: any}>}
 */
export const submitApplication = async (application) => {
  const { baseUrl, timeout } = config.get('caseManagementApi')

  const response = await Wreck.post(`${baseUrl}/submit`, {
    payload: application.caseManagementData,
    timeout
  })

  return {
    statusCode: response.res.statusCode,
    payload: JSON.parse(response.payload)
  }
}
