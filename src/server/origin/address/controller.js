import validator from './validator.js'

const indexView = 'origin/address/index'
export const pageTitle =
  'What is the address of your farm or premises where the animals are moving off?'
export const pageHeading =
  'What is the address of your farm or premises where the animals are moving off?'

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const originAddressGetController = {
  handler(req, h) {
    const { address } = req.yar.get('origin') ?? {}

    return h.view(indexView, {
      pageTitle,
      heading: pageHeading,
      values: address
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

    const { isValid, errors } = validator(originAddress)
    const errorMessages = Object.entries(errors ?? {}).map(([key, value]) => ({
      text: value.text,
      href: `#${key}`
    }))

    if (!isValid) {
      req.yar.clear('originAddress')
      return res.view(indexView, {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageHeading,
        values: req.payload,
        errorMessages,
        errors
      })
    }

    req.yar.set('origin', {
      ...req.yar.get('origin'),
      address: originAddress
    })

    return res.redirect('/origin/summary')
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { OriginAddress } from './validator.js'
 */
