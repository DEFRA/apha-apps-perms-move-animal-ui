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
    const matchingCphs = await findMatchingCphs(cphs)

    for (const cph of cphs) {
      logger.info(
        {
          applicationId,
          applicationCph: cph,
          cphMatchResult: matchingCphs.has(cph),
          cphType: cph === keyFacts?.originCph ? 'origin' : 'destination'
        },
        'CPH match result'
      )
    }
  } catch (error) {
    logger.error?.(
      {
        err: error instanceof Error ? error : new TypeError(String(error)),
        applicationId
      },
      'CPH API unavailable'
    )
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
