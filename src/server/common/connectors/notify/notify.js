import { config } from '~/src/config/config.js'
import { proxyFetch } from '~/src/server/common/helpers/proxy.js'
import { createToken } from '~/src/server/common/connectors/notify/notify-token-utils.js'

/**
 * @typedef {{ content: string}} NotifyContent
 */
const notifyConfig = config.get('notify')
const requestTimeout = 10000

/**
 * @param {NotifyContent} data
 */
export async function sendNotification(data) {
  const body = JSON.stringify({
    template_id: notifyConfig.templateId,
    email_address: notifyConfig.caseDeliveryEmailAddress,
    personalisation: data
  })

  let response

  try {
    response = await proxyFetch(
      'https://api.notifications.service.gov.uk/v2/notifications/email',
      {
        method: 'POST',
        body,
        headers: {
          Authorization: 'Bearer ' + createToken(notifyConfig.apiKey)
        },
        signal: AbortSignal.timeout(requestTimeout)
      }
    )
  } catch (err) {
    if (err.code && err.code === err.TIMEOUT_ERR) {
      throw new Error(
        `Request to GOV.uk notify timed out after ${requestTimeout}ms`
      )
    } else {
      throw new Error(
        `Request to GOV.uk notify failed with error: ${err.message}`
      )
    }
  }

  if (!response.ok) {
    const responseBody = await response.json()
    const errors = responseBody.errors.map((error) => error.message)
    throw new Error(
      `HTTP failure from GOV.uk notify: status ${response.status} with the following errors: ${errors.join(', ')}`
    )
  }

  return response
}
