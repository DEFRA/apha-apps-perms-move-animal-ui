import axios from 'axios'
import jwt from 'jsonwebtoken'

const GOV_NOTIFY_API_KEY = process.env.GOV_NOTIFY_API_KEY
const GOV_NOTIFY_BASE_URL = 'https://api.notifications.service.gov.uk'

const generateJwt = (apiKey) => {
  const keyPattern = /^.+-([0-9a-fA-F-]{36})-([0-9a-fA-F-]{36})$/
  const match = apiKey.match(keyPattern)

  if (!match) {
    throw new Error('Invalid GOV.UK Notify API key format')
  }

  const [, serviceId, secretKey] = match

  const payload = {
    iss: serviceId,
    iat: Math.floor(Date.now() / 1000)
  }

  return jwt.sign(payload, secretKey, {
    algorithm: 'HS256',
    header: { typ: 'JWT', alg: 'HS256' }
  })
}

export const waitForEmail = async (
  toEmail,
  subjectSnippet,
  maxRetries = 5,
  delayMs = 2000
) => {
  const authHeaders = {
    Authorization: `Bearer ${generateJwt(GOV_NOTIFY_API_KEY)}`,
    'Content-Type': 'application/json'
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const url = `${GOV_NOTIFY_BASE_URL}/v2/notifications?template_type=email`
    const { data } = await axios.get(url, { headers: authHeaders })

    const matching = data.notifications
      .filter(
        ({ subject, email_address: emailAddress }) =>
          subject.includes(subjectSnippet) && emailAddress === toEmail
      )
      .sort(({ created_at: a }, { created_at: b }) => new Date(b) - new Date(a))

    if (matching.length > 0) {
      const latest = matching[0]
      const detailUrl = `${GOV_NOTIFY_BASE_URL}/v2/notifications/${latest.id}`
      const { data: detail } = await axios.get(detailUrl, {
        headers: authHeaders
      })

      return detail
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }

  throw new Error(
    `No email with subject "${subjectSnippet}" received at ${toEmail} after ${maxRetries} attempts.`
  )
}
