import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'
import { createToken } from '~/src/server/common/connectors/notify/notify-token-utils.js'
import { statusCodes } from '../../constants/status-codes.js'

/**
 * @typedef {{ content: string, link_to_file?: object}} NotifyContent
 */

/**
 * @param {NotifyContent} data
 */
export async function sendNotification(data) {
  const { ...notifyConfig } = config.get('notify')

  const payload = JSON.stringify({
    template_id: notifyConfig.templateId,
    email_address: notifyConfig.caseDeliveryEmailAddress,
    personalisation: {
      content: data.content,
      link_to_file: data.link_to_file ?? ''
    }
  })

  let response

  try {
    response = await Wreck.post(notifyConfig.url, {
      payload,
      headers: {
        Authorization: 'Bearer ' + createToken(notifyConfig.apiKey)
      },
      timeout: notifyConfig.timeout
    })
  } catch (err) {
    if (err.output?.statusCode === statusCodes.gatewayTimeout) {
      throw new Error(
        `Request to GOV.uk notify timed out after ${notifyConfig.timeout}ms`
      )
    } else if (err.data) {
      const errors = JSON.parse(err.data.payload?.toString())
      const errorMessages = errors.errors.map((error) => error.message)
      throw new Error(
        `HTTP failure from GOV.uk notify: status ${errors.statusCode} with the following errors: ${errorMessages.join(', ')}`
      )
    } else {
      throw new Error(
        `Request to GOV.uk notify failed with error: ${err.message}`
      )
    }
  }

  return JSON.parse(response.payload.toString())
}
