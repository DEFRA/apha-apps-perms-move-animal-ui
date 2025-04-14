import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'

async function refreshAccessToken(request) {
  const authedUser = await request.getUserSession()
  const refreshToken = authedUser?.refreshToken ?? null
  const clientId = config.get('auth').defraIdClientId
  const clientSecret = config.get('auth').defraIdClientSecret

  const params = new URLSearchParams()

  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken)
  params.append('scope', `${clientId} openid profile email offline_access`)

  request.logger.info('Access token expired, refreshing...')

  return Wreck.post(authedUser.tokenUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    },
    payload: params,
    rejectUnauthorized: false
  })
}

export { refreshAccessToken }
