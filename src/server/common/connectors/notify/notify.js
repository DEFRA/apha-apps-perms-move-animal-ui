import { config } from '~/src/config/config.js'
import { proxyFetch } from '~/src/server/common/helpers/proxy.js'
import { createToken } from '~/src/server/common/connectors/notify/notify-token-utils.js'

/**
 * @typedef {{ content: string}} NotifyContent
 */
const notifyConfig = config.get('notify')

/**
 * @param {NotifyContent} data
 */
export function sendNotification(data) {
  const body = JSON.stringify({
    template_id: notifyConfig.templateId,
    email_address: notifyConfig.caseDeliveryEmailAddress,
    personalisation: data
  })

  return proxyFetch(
    'https://api.notifications.service.gov.uk/v2/notifications/email',
    {
      method: 'POST',
      body,
      headers: {
        Authorization: 'Bearer ' + createToken(notifyConfig.apiKey)
      }
    }
  ).then(async (response) => {
    if (!response.ok) {
      const body = await response.json()
      const errors = body.errors.map((error) => error.message)
      throw new Error(
        `HTTP failure from GOV.uk notify: status ${response.status} with the following errors: ${errors.join(', ')}`
      )
    }
    return response
  })
}
