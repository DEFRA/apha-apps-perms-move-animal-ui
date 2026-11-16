import nunjucks from 'nunjucks'
import { escapeHtml } from '~/src/server/common/helpers/escape-text.js'

/**
 * @param {string} text
 * @param {{ APHA: string, GDPR: string }} titles
 * @returns {import('nunjucks').runtime.SafeString}
 */
export function formatAbbreviations(text, titles) {
  const parts = text.split(/\b(APHA|GDPR)\b/g)
  const html = parts
    .map((part) => {
      if (part === 'APHA' || part === 'GDPR') {
        return `<abbr title="${escapeHtml(titles[part])}">${part}</abbr>`
      }

      return escapeHtml(part)
    })
    .join('')

  return new nunjucks.runtime.SafeString(html)
}
