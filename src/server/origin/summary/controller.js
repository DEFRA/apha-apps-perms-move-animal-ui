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
    const { isValid, result } = origin.validate()

    if (!isValid) {
      if (!result.onOffFarm.isValid) {
        return h.redirect(
          '/origin/to-or-from-own-premises?redirect_uri=/origin/summary'
        )
      }
      if (!result.cphNumber.isValid) {
        return h.redirect('/origin/cph-number?redirect_uri=/origin/summary')
      }
      if (!result.address.isValid) {
        return h.redirect('/origin/address?redirect_uri=/origin/summary')
      }
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
 */
