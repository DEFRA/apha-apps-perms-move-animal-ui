import { Address } from '~/src/server/common/model/address.js'

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
    const address = Address.fromState(req.yar.get('origin')?.address)

    return h.view(indexView, {
      pageTitle,
      heading: pageHeading,
      values: address.value
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 * @param req
 */
export const originAddressPostController = {
  handler(req, res) {
    const payload = /** @type {AddressData} */ (req.payload)
    const address = new Address(req.payload)

    const { isValid, errors } = address.validate()
    const errorMessages = Object.entries(errors).map(([key, value]) => ({
      text: value.text,
      href: `#${key}`
    }))

    if (!isValid) {
      req.yar.set('origin', {
        ...req.yar.get('origin'),
        address: undefined
      })

      return res.view(indexView, {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageHeading,
        values: payload,
        errorMessages,
        errors
      })
    }

    req.yar.set('origin', {
      ...req.yar.get('origin'),
      address: address.toState()
    })

    return res.redirect('/origin/summary')
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { AddressData } from '~/src/server/common/model/address.js'
 */
