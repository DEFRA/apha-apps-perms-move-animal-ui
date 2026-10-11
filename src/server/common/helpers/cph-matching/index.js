import { findMatchingCphs } from '../../apis/integration-bridge/index.js'

/** @import { Logger } from 'pino' */

/** @typedef {'matched' | 'not-matched' | 'unavailable'} CphMatchOutcome */

const maxAttempts = 2

/**
 * Checks whether a CPH is a holding known to SAM. If the API is unavailable
 * the request is retried once before giving up.
 * @param {string} cph
 * @param {Logger} logger
 * @returns {Promise<CphMatchOutcome>}
 */
export const matchCph = async (cph, logger) => {
  let lastError

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const matched = (await findMatchingCphs([cph])).has(cph)

      logger.info(`CPH match result: cph=${cph} matched=${matched}`)

      return matched ? 'matched' : 'not-matched'
    } catch (error) {
      lastError = error instanceof Error ? error : new TypeError(String(error))
      logger.warn(
        { err: lastError },
        `CPH match attempt ${attempt} of ${maxAttempts} failed: cph=${cph}`
      )
    }
  }

  logger.error({ err: lastError }, `CPH API unavailable: cph=${cph}`)

  return 'unavailable'
}
