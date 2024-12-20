// eslint-disable-next-line n/no-unpublished-import
import { NotifyClient } from 'notifications-node-client'
import { config } from '~/src/config/config.js'

/**
 * @typedef {{ content: string}} NotifyContent
 */

/**
 * @param {NotifyContent} data
 */
export function sendNotification(data) {
  const notifyConfig = config.get('notify')
  const notifyClient = new NotifyClient(notifyConfig.apiKey)

  return notifyClient.sendEmail(
    notifyConfig.templateId,
    notifyConfig.caseDeliveryEmailAddress,
    {
      personalisation: data,
      reference: null
    }
  )
}
