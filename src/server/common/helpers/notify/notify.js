import { config } from '~/src/config/config.js'
import { proxyFetch } from '../proxy.js'
import { createToken } from '../token/token-utils.js'

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
  ).then((response) => {
    if (!response.ok) {
      throw new Error()
    }
    return response
  })
}
