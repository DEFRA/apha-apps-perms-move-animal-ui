import Wreck from '@hapi/wreck'

import { config } from '~/src/config/config.js'

/**
 * @typedef {{
 *   payload: Record<string, unknown>,
 *   applicationId: string,
 *   logger: {
 *     info: (...args: Array<unknown>) => void,
 *     debug?: (...args: Array<unknown>) => void,
 *     error?: (...args: Array<unknown>) => void
 *   }
 * }} CphMatchingContext
 */

/**
 * @param {Record<string, unknown>} payload
 * @returns {Array<string>}
 */
const getCphsToMatch = (payload) => {
  const keyFacts =
    /** @type {{ originCph?: string, destinationCph?: string } | undefined} */ (
      payload?.keyFacts
    )

  if (!keyFacts) {
    return []
  }

  const { originCph, destinationCph } = keyFacts

  return [originCph, destinationCph].filter((cph) => typeof cph === 'string')
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

  if (statusCode >= 400) {
    throw new Error(`Request failed (${statusCode}): ${url}`)
  }

  return JSON.parse(response.payload)
}

/**
 * @param {{ tokenUrl: string, clientId: string, clientSecret: string, timeout: number }} configValues
 * @returns {Promise<string>}
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
    throw new Error(
      'Integration bridge token response did not include an access token'
    )
  }

  return response.access_token
}

/**
 * @param {Array<string>} ids
 * @param {string} accessToken
 * @param {{ baseUrl: string, timeout: number }} configValues
 * @returns {Promise<Set<string>>}
 */
const getMatchingCphs = async (ids, accessToken, configValues) => {
  const response = /** @type {{ data?: Array<{ id?: string }> }} */ (
    await post(
      `${configValues.baseUrl}/holdings/find`,
      JSON.stringify({ ids }),
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      configValues
    )
  )

  if (!Array.isArray(response.data)) {
    throw new Error('Integration bridge holdings response is invalid')
  }

  return new Set(
    response.data.flatMap(({ id }) => (typeof id === 'string' ? [id] : []))
  )
}

/**
 * @param {CphMatchingContext} context
 * @returns {Promise<void>}
 */
export const runCphMatching = async ({ payload, applicationId, logger }) => {
  const keyFacts =
    /** @type {{ originCph?: string, destinationCph?: string } | undefined} */ (
      payload?.keyFacts
    )

  const cphs = getCphsToMatch(payload)

  if (cphs.length === 0) {
    return
  }

  try {
    const configValues =
      /** @type {{ baseUrl: string, tokenUrl: string, clientId: string, clientSecret: string, timeout: number }} */ (
        config.get('integrationBridge')
      )

    const accessToken = await getAccessToken(configValues)
    const matchingCphs = await getMatchingCphs(cphs, accessToken, configValues)

    for (const cph of cphs) {
      logger.info('CPH match result', {
        cphMatch: {
          applicationId,
          applicationCph: cph,
          result: matchingCphs.has(cph),
          type: cph === keyFacts?.originCph ? 'origin' : 'destination'
        }
      })
    }
  } catch (error) {
    logger.error?.('CPH API unavailable', {
      err: error instanceof Error ? error : new Error(String(error)),
      applicationId
    })
  }
}
