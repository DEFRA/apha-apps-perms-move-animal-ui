import { Address } from '~/src/server/common/model/answer/address.js'
import { calculateNextPage } from '../../common/helpers/next-page.js'

const indexView = 'origin/address/index'
export const pageTitle =
  'What is the address of your farm or premises where the animals are moving off?'
export const heading = pageTitle

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const originAddressGetController = {
  handler(req, h) {
    const address = Address.fromState(req.yar.get('origin')?.address)

    return h.view(indexView, {
      nextPage: req.query.redirect_uri,
      pageTitle,
      heading,
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
    const payload = /** @type {AddressData & NextPage} */ (req.payload)
    const address = new Address(payload)

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
        nextPage: req.query.redirect_uri,
        pageTitle: `Error: ${pageTitle}`,
        heading,
        values: payload,
        errorMessages,
        errors
      })
    }

    req.yar.set('origin', {
      ...req.yar.get('origin'),
      address: address.toState()
    })

    return res.redirect(calculateNextPage(payload.nextPage, '/origin/summary'))
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { AddressData } from '~/src/server/common/model/answer/address.js'
 * @import {NextPage} from '../../common/helpers/next-page.js'
 */
