import { findMatchingCphs } from '../../apis/integration-bridge/index.js'

/** @typedef {{ type: 'text', value: string }} TextKeyFact */
/** @typedef {{ originCph?: TextKeyFact, destinationCph?: TextKeyFact }} CphKeyFacts */

/**
 * @param {TextKeyFact | undefined} keyFact
 * @returns {string | undefined}
 */
const getTextKeyFactValue = (keyFact) => keyFact?.value

/**
 * @param {Record<string, unknown>} payload
 * @returns {Array<string>}
 */
const getCphsToMatch = (payload) => {
  const keyFacts = /** @type {CphKeyFacts | undefined} */ (payload?.keyFacts)

  if (!keyFacts) {
    return []
  }

  const { originCph, destinationCph } = keyFacts

  return [
    getTextKeyFactValue(originCph),
    getTextKeyFactValue(destinationCph)
  ].filter((cph) => typeof cph === 'string')
}

/**
 * @param {string} applicationId
 * @param {Array<string>} cphs
 * @param {CphKeyFacts | undefined} keyFacts
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
      const cphType =
        cph === getTextKeyFactValue(keyFacts?.originCph)
          ? 'origin'
          : 'destination'
      const cphMatchResult = matchingCphs.has(cph)

      logger.info(
        `CPH match result: applicationId=${applicationId} cph=${cph} type=${cphType} matched=${cphMatchResult}`
      )
    }
  } catch (error) {
    logger.error?.(
      { err: error instanceof Error ? error : new TypeError(String(error)) },
      `CPH API unavailable: applicationId=${applicationId}`
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
  const keyFacts = /** @type {CphKeyFacts | undefined} */ (payload?.keyFacts)
  await runCphMatching(applicationId, cphs, keyFacts, logger)
}
