import sanitizeHtml from 'sanitize-html'

/**
 * Sanitises an object by applying a sanitisation function to each value.
 * @param {object} data - The input object to be sanitised. If null or undefined, an empty object is used.
 * @returns {object} An array of key-value pairs where each value has been sanitised.
 */
export const sanitiseObject = (data) => {
  const sanitised = {}
  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      const value = data[key]

      if (typeof value === 'string') {
        sanitised[key] = sanitiseValue(value)
      } else {
        sanitised[key] = value
      }
    }
  }
  return sanitised
}
/**
 * Sanitises a given value by removing all HTML tags and attributes.
 * @param {string} value - The input string to be sanitised.
 * @returns {string | undefined} - The sanitised string with all HTML tags and attributes removed.
 */
export const sanitiseValue = (value) => {
  if (!value) {
    return undefined
  }
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  })
}
