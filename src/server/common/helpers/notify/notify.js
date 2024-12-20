import { config } from '~/src/config/config.js'
import { token } from '@hapi/jwt'
import { proxyFetch } from '../proxy.js'

/**
 * @typedef {{ content: string}} NotifyContent
 */
const notifyConfig = config.get('notify')

const SECRET_LENGTH = 36
const ISSUER_START_OFFSET = 73
const ISSUER_END_OFFSET = 37

const secrets = (apiKey) => ({
  secret: apiKey.substring(apiKey.length - SECRET_LENGTH, apiKey.length),
  iss: apiKey.substring(
    apiKey.length - ISSUER_START_OFFSET,
    apiKey.length - ISSUER_END_OFFSET
  )
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
  ).then((response) => {
    if (!response.ok) {
      throw new Error()
    }
    return response
  })
}
