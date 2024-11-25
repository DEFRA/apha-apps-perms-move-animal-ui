import validator from './validator.js'

export const pageTitle =
  'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'
const indexView = 'origin/cph-number/index'

/**
 * CPH number question.
 * @satisfies {Partial<ServerRoute>}
 */
export const getController = {
  handler(req, h) {
    const { cphNumber } = req.yar.get('origin') ?? {}

    return h.view(indexView, {
      pageTitle,
      heading: pageTitle,
      cphNumber: {
        value: cphNumber
      }
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
    const { cphNumber } = /** @type {CphNumberPayload} */ (req.payload)
    // Remove whitespace from cphNumber
    const input = cphNumber ? cphNumber.replace(/\s+/g, '') : cphNumber
    const [isValid, message] = validator(input)

    if (!isValid) {
      req.yar.clear('cphNumber')
      return res.view(indexView, {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageTitle,
        cphNumber: {
          value: input
        },
        errorMessage: {
          text: message
        }
      })
    }

    req.yar.set('origin', {
      ...req.yar.get('origin'),
      cphNumber: input
    })

    return res.redirect('/origin/address')
  }
}

/**
 * @typedef {{ cphNumber: string }} CphNumberPayload
 * @import { ServerRoute, Request } from '@hapi/hapi'
 */
