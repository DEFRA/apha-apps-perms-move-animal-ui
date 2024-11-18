import validator from './validator.js'

export const pageTitle =
  'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'

/**
 * CPH number question.
 * @satisfies {Partial<ServerRoute>}
 */
export const getController = {
  handler(req, h) {
    const cphNumber = req.yar.get('cphNumber')

    return h.view('cph-number/index', {
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
    const [isValid, message] = validator(cphNumber)

    if (!isValid) {
      req.yar.clear('cphNumber')
      return res.view('cph-number/index', {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageTitle,
        cphNumber: {
          value: cphNumber
        },
        errorMessage: {
          text: message
        }
      })
    }

    req.yar.set('cphNumber', cphNumber)

    return res.view('cph-number/index', {
      pageTitle,
      heading: pageTitle,
      cphNumber: {
        value: cphNumber
      }
    })
  }
}

/**
 * @typedef {{ cphNumber: string }} CphNumberPayload
 * @import { ServerRoute, Request } from '@hapi/hapi'
 */
