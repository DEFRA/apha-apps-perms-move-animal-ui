import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'

const MINIMUM_ERROR_STATUS_CODE = 400

/**
 * @param {Array<string>} cphs
 * @returns {Promise<Set<string>>}
 */
export const findMatchingCphs = async (cphs) => {
  const configValues = config.get('integrationBridge')

  const response = /** @type {{ access_token?: string }} */ (
    await getAccessToken(configValues)
  )

  const matchingCphs = await getMatchingCphsFromBridge(
    cphs,
    response.access_token,
    configValues
  )

  return matchingCphs
}

/**
 * @param {{ tokenUrl: string, clientId: string, clientSecret: string, timeout: number }} configValues
 * @returns {Promise<{ access_token?: string }>}
 */
const getAccessToken = async ({
  tokenUrl,
  clientId,
  clientSecret,
  timeout
}) => {
  const credentials = `${clientId}:${clientSecret}`
  const payload = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  }).toString()

  const response = /** @type {{ access_token?: string }} */ (
    await post(
      tokenUrl,
      payload,
      {
        Authorization: `Basic ${Buffer.from(credentials).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      { timeout }
    )
  )

  if (!response.access_token) {
    throw new TypeError(
      'Integration bridge token response did not include an access token'
    )
  }

  return response
}

/**
 * @param {Array<string>} cphs
 * @param {string | undefined} accessToken
 * @param {{ baseUrl: string, timeout: number }} configValues
 * @returns {Promise<Set<string>>}
 */
const getMatchingCphsFromBridge = async (cphs, accessToken, configValues) => {
  const response = /** @type {{ data?: Array<{ id?: string }> }} */ (
    await post(
      `${configValues.baseUrl}/holdings/find`,
      JSON.stringify({ ids: cphs }),
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      configValues
    )
  )

  if (!Array.isArray(response.data)) {
    throw new TypeError('Integration bridge holdings response is invalid')
  }

  return new Set(
    response.data.flatMap(({ id }) => (typeof id === 'string' ? [id] : []))
  )
}

/**
 * @param {string} url
 * @param {string} payload
 * @param {Record<string, string>} headers
 * @param {{ timeout: number }} configValues
 * @returns {Promise<unknown>}
 */
const post = async (url, payload, headers, { timeout }) => {
  const response = await Wreck.post(url, {
    payload,
    headers,
    timeout
  })

  const statusCode = response.res.statusCode ?? 0

  if (statusCode >= MINIMUM_ERROR_STATUS_CODE) {
    throw new TypeError(`Request failed (${statusCode}): ${url}`)
  }

  return JSON.parse(response.payload)
}
