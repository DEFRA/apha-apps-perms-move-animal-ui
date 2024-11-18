import { JSDOM } from 'jsdom'

/**
 * @param {string} payload
 * @returns {Document}
 */
export const parseDocument = (payload) => new JSDOM(payload).window.document
