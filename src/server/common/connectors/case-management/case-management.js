import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'

/** @import { ApplicationModel } from '../../model/application/application.js' */

/** @param {ApplicationModel} application */
export const submitApplication = async (application) => {
  const { baseUrl, timeout } = config.get('caseManagementApi')
  let response
  try {
    response = await Wreck.post(baseUrl, {
      payload: application.caseManagementData,
      timeout
    })
  } catch (err) {
    throw new Error(
      `Failed to send application to case management API: ${err.message}`
    )
  }

  return JSON.parse(response.payload)
}
