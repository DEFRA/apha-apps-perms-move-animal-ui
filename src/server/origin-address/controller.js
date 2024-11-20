import validator from './validator.js'

const indexView = 'origin-address/index.njk'
export const pageTitle =
  'What is the address of your farm or premises where the animals are moving off?'
export const pageHeading =
  'What is the address of your farm or premises where the animals are moving off?'

/**
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
    } = /** @type {OriginAddress} */ (req.payload)

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
 * }} OriginAddress
 * @import { ServerRoute } from '@hapi/hapi'
 */
