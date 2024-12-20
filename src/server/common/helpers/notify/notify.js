import { config } from '~/src/config/config.js'
import { token } from '@hapi/jwt'
import { proxyFetch } from '../proxy.js'

/**
 * @typedef {{ content: string}} NotifyContent
 */
const notifyConfig = config.get('notify')

const secrets = (apiKey) => ({
  iss: apiKey.substring(apiKey.length - 36, apiKey.length),
  secret: apiKey.substring(apiKey.length - 73, apiKey.length - 37)
})

function createToken({ iss, secret }) {
  const iat = Math.round(Date.now() / 1000)

  return token.generate({ iss, iat }, secret, {
    header: { typ: 'JWT', alg: 'HS256' }
  })
}

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
        Authorization: 'Bearer ' + createToken(secrets(notifyConfig.apiKey))
      }
    }
  )
}
