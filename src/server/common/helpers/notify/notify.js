// eslint-disable-next-line n/no-unpublished-import
import { NotifyClient } from 'notifications-node-client'
import { config } from '~/src/config/config.js'

/**
 * @typedef {{ content: string}} NotifyContent
 */

const notifyConfig = config.get('notify')
const notifyClient = new NotifyClient(notifyConfig.apiKey)

/**
 * @param {NotifyContent} data
 */
export function sendNotification(data) {
  return notifyClient.sendEmail(
    notifyConfig.templateId,
    notifyConfig.caseDeliveryEmailAddress,
    {
      personalisation: data,
      reference: null
    }
  )
}
