/**
 * @template T
 * @param {T[] | T | undefined} value
 * @returns T[]
 */
export const ensureArray = (value) => {
  value = value ?? []
  return Array.isArray(value) ? value : [value]
}
