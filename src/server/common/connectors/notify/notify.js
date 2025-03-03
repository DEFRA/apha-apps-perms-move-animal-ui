import { config } from '~/src/config/config.js'
import { proxyFetch } from '~/src/server/common/helpers/proxy.js'
import { createToken } from '~/src/server/common/connectors/notify/notify-token-utils.js'

/**
 * @typedef {{ content: string, link_to_file?: object}} NotifyContent
 */

export const NOTIFY_URL =
  'https://api.notifications.service.gov.uk/v2/notifications/email'

/**
 * @param {NotifyContent} data
 */
export async function sendNotification(data) {
  const { timeout, ...notifyConfig } = config.get('notify')

  const body = JSON.stringify({
    template_id: notifyConfig.templateId,
    email_address: notifyConfig.caseDeliveryEmailAddress,
    personalisation: {
      content: data.content,
      link_to_file: data.link_to_file ?? ''
    }
  })

  let response

  try {
    response = await proxyFetch(NOTIFY_URL, {
      method: 'POST',
      body,
      headers: {
        Authorization: 'Bearer ' + createToken(notifyConfig.apiKey)
      },
      signal: AbortSignal.timeout(timeout)
    })
  } catch (err) {
    if (err.code && err.code === err.TIMEOUT_ERR) {
      throw new Error(`Request to GOV.uk notify timed out after ${timeout}ms`)
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
