export default (/** @type {OriginAddress} */ originAddress) => {
  const { addressLine1, addressTown, addressPostcode } = originAddress

  let valid = true
  const errors = {}

  if (!addressLine1) {
    valid = false
    errors.addressLine1 = {
      text: 'Enter address line 1, typically the building and street'
    }
  } else if (!validateLength(addressLine1)) {
    valid = false
    errors.addressLine1 = {
      text: 'Address line 1 must be no longer than 255 characters'
    }
  }

  if (!validateLength(originAddress?.addressLine2, false)) {
    valid = false
    errors.addressLine1 = {
      text: 'Address line 2 must be no longer than 255 characters'
    }
  }

  if (!addressTown) {
    valid = false
    errors.addressTown = {
      text: 'Enter town or city'
    }
  } else if (!validateLength(originAddress.addressTown)) {
    valid = false
    errors.addressLine1 = {
      text: 'Address line 2 must be no longer than 255 characters'
    }
  }

  if (!addressPostcode) {
    valid = false
    errors.addressPostcode = {
      text: 'Enter postcode'
    }
  } else if (!validatePostcode(originAddress.addressPostcode)) {
    valid = false
    errors.addressPostcode = {
      text: 'Enter a full UK postcode'
    }
  }

  return [valid, errors]
}

/**
 * Validate that input is present and between 1 and 255 characters.
 * @param {string} input
 * @returns {boolean} - Returns a tuple where the first element is a boolean indicating validity, and the second element is an error message if invalid.
 */
export function validateLength(input, required = true, min = 1, max = 255) {
  if (!input && !required) {
    return true
  }

  if (input.length < min || input.length > max) {
    return false
  }
  return true
}

/**
 * Validate that the postcode is in a valid format.
 * @param {string} postcode
 * @returns {boolean} - Returns whether postcode is valid or not
 */
export function validatePostcode(postcode) {
  const postcodeRegex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/

  if (!postcodeRegex.test(postcode)) {
    return false
  }
  return true
}

/**
 * @typedef {{
 *  addressLine1: string;
 *  addressLine2: string;
 *  addressTown: string;
 *  addressCounty: string;
 *  addressPostcode: string;
 * }} OriginAddress
 */
