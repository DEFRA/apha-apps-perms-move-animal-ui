import { calculateNextPage } from '../../common/helpers/next-page.js'
import { CphNumber } from '~/src/server/common/model/cph-number.js'

export const pageTitle =
  'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'
const indexView = 'origin/cph-number/index'

/**
 * CPH number question.
 * @satisfies {Partial<ServerRoute>}
 */
export const getController = {
  handler(req, h) {
    const cphNumber = CphNumber.fromState(req.yar.get('origin').cphNumber)

    return h.view(indexView, {
      nextPage: req.query.redirect_uri,
      pageTitle,
      heading: pageTitle,
      cphNumber
    })
  }
}

/**
 * Respond to the CPH number.
 * @satisfies {Partial<ServerRoute>}
 * @param req
 */
export const postController = {
  handler(req, res) {
    const payload = /** @type {CphNumberPayload & NextPage} */ (req.payload)
    const cphNumber = new CphNumber(payload)
    // Remove whitespace from cphNumber
    const { isValid, errors } = cphNumber.validate()

    if (!isValid) {
      req.yar.set('origin', {
        ...req.yar.get('origin'),
        cphNumber: undefined
      })

      return res.view(indexView, {
        nextPage: calculateNextPage(payload.nextPage, '/origin/address'),
        pageTitle: `Error: ${pageTitle}`,
        heading: pageTitle,
        errorMessage: errors.cphNumber,
        cphNumber
      })
    }

    req.yar.set('origin', {
      ...req.yar.get('origin'),
      cphNumber: cphNumber.toState()
    })

    return res.redirect(calculateNextPage(payload.nextPage, '/origin/address'))
  }
}

/**
 * @typedef {{ cphNumber: string }} CphNumberPayload
 * @import { ServerRoute } from '@hapi/hapi'
 * @import {NextPage} from '../../common/helpers/next-page.js'
 */
