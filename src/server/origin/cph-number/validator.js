/**
 * @returns [ boolean | string | null ]
 */
export default (input) => {
  const valid = /([0-9]{2})\/([0-9]{3})\/([0-9]{4})/g
  const requiredLength = 11

  if (!input) {
    return [false, 'Enter the farm or premises CPH number']
  }

  if (input && (!valid.test(input) || input.length !== requiredLength)) {
    return [
      false,
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    ]
  }

  return [true, null]
}
