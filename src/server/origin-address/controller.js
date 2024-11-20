import validator from './validator.js'

const indexView = 'origin-address/index.njk'
export const pageTitle =
  'What is the address of your farm or premises where the animals are moving off?'
export const pageHeading =
  'What is the address of your farm or premises where the animals are moving off?'

/**
 * The first question to start the journey.
 * @satisfies {Partial<ServerRoute>}
 */
export const originAddressGetController = {
  handler(req, h) {
    const originAddress = req.yar.get('originAddress')

    return h.view(indexView, {
      pageTitle,
      heading: pageHeading,
      values: originAddress
    })
  }
}

/**
 * Respond to the entry of origin address details.
 * @satisfies {Partial<ServerRoute>}
 * @param req
 */
export const originAddressPostController = {
  handler(req, res) {
    const {
      addressLine1,
      addressLine2,
      addressTown,
      addressCounty,
      addressPostcode
    } = /** @type {OriginAddressPayload} */ (req.payload)

    const originAddress = {
      addressLine1,
      addressLine2,
      addressTown,
      addressCounty,
      addressPostcode
    }

    const [isValid, errors] = validator(originAddress)

    if (!isValid) {
      return res.view(indexView, {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageHeading,
        values: req.payload,
        errorMessages: Object.entries(errors).map(([key, value]) => {
          return {
            text: value.text,
            href: `#${key}`
          }
        }),
        errors
      })
    }

    req.yar.set('originAddress', originAddress)

    return res.redirect('/origin-address')
  }
}

/**
 * export @typedef {{
 *  addressLine1: string;
 *  addressLine2: string;
 *  addressTown: string;
 *  addressCounty: string;
 *  addressPostcode: string;
 * }} OriginAddressPayload
 * @exports OriginAddressPayload
 * @import { ServerRoute } from '@hapi/hapi'
 */
