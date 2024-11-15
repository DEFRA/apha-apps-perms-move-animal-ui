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
    const valid = /([0-9]{2})\/([0-9]{3})\/([0-9]{4})/g
    let errorMessage = null
    let { cphNumber } = /** @type {CphNumberPayload} */ (req.payload)

    // Remove whitespace from cphNumber
    cphNumber = cphNumber ? cphNumber.replace(/\s+/g, '') : ''

    if (!cphNumber) {
      errorMessage = {
        text: 'Enter the farm or premises CPH number'
      }
    }

    if (cphNumber && (!valid.test(cphNumber) || cphNumber.length !== 11)) {
      errorMessage = {
        text: 'Enter the CPH number in the correct format, for example, 12/345/6789'
      }
    }

    if (errorMessage) {
      req.yar.clear('cphNumber')
      return res.view('cph-number/index', {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageTitle,
        cphNumber: {
          value: cphNumber
        },
        errorMessage
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
