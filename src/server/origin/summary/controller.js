import { Origin } from '../../common/model/section/origin.js'

const indexView = 'origin/summary/index.njk'
export const pageTitle =
  'Check your answers before you continue your application'
export const heading = pageTitle

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const originSummaryGetController = {
  handler(req, h) {
    const origin = Origin.fromState(req.yar.get('origin'))

    if (!origin.onOffFarm.validate().isValid) {
      return h.redirect(
        '/origin/to-or-from-own-premises?redirect_uri=/origin/summary'
      )
    }

    if (!origin.cphNumber.validate().isValid) {
      return h.redirect('/origin/cph-number?redirect_uri=/origin/summary')
    }

    if (!origin.address.validate().isValid) {
      return h.redirect('/origin/address?redirect_uri=/origin/summary')
    }

    return h.view(indexView, {
      pageTitle,
      heading,
      origin: {
        cphNumber: origin?.cphNumber.html,
        address: origin.address.html,
        onOffFarm: origin.onOffFarm.html
      }
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const originSummaryPostController = {
  handler(_req, h) {
    return h.redirect('/task-list')
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { AddressData } from '~/src/server/common/model/answer/address.js'
 * @typedef {{
 *   onOffFarm: string;
 *   cphNumber: string;
 *   address: AddressData;
 * }} Origin
 */
