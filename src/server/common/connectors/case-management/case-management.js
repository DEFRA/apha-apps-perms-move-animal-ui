import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'

/** @import { ApplicationModel } from '../../model/application/application.js' */

/**
 * Function to calculate the journey id when foot and mouth etc are supported
 * @returns {string}
 */
export const getJourneyId = () =>
  'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_TB_ENGLAND'

/**
 * @param {ApplicationModel} application
 * @returns {Promise<{statusCode: number | undefined, payload: any}>}
 */
export const submitApplication = async (application) => {
  const { baseUrl, timeout } = config.get('caseManagementApi')

  const response = await Wreck.post(`${baseUrl}/submit`, {
    payload: {
      journeyVersion: {
        major: 1,
        minor: 0
      },
      journeyId: getJourneyId(),
      ...application.caseManagementData
    },
    timeout
  })

  return {
    statusCode: response.res.statusCode,
    payload: JSON.parse(response.payload)
  }
}
