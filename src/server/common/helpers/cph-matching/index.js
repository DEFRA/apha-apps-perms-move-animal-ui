import { config } from '~/src/config/config.js'
import { findMatchingCphs } from '../../apis/integration-bridge/index.js'

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
 * @param {string} applicationId
 * @param {Array<string>} cphs
 * @param {{ originCph?: string, destinationCph?: string } | undefined} keyFacts
 * @param {{ info: (...args: Array<unknown>) => void, error?: (...args: Array<unknown>) => void }} logger
 * @returns {Promise<void>}
 */
export const runCphMatching = async (applicationId, cphs, keyFacts, logger) => {
  if (cphs.length === 0) {
    return
  }

  try {
    const integrationBridgeConfig =
      /** @type {{ baseUrl: string, tokenUrl: string, clientId: string, clientSecret: string, timeout: number }} */ (
        config.get('integrationBridge')
      )

    const matchingCphs = await findMatchingCphs(cphs, integrationBridgeConfig)

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
      err: error instanceof Error ? error : new TypeError(String(error)),
      applicationId
    })
  }
}

/**
 * @param {{ payload: Record<string, unknown>, applicationId: string, logger: { info: (...args: Array<unknown>) => void, debug?: (...args: Array<unknown>) => void, error?: (...args: Array<unknown>) => void } }} context
 * @returns {Promise<void>}
 */
export const runCphMatchingFromApplication = async ({
  payload,
  applicationId,
  logger
}) => {
  const cphs = getCphsToMatch(payload)
  const keyFacts =
    /** @type {{ originCph?: string, destinationCph?: string } | undefined} */ (
      payload?.keyFacts
    )
  await runCphMatching(applicationId, cphs, keyFacts, logger)
}
