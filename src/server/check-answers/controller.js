import { Origin } from '../common/model/section/origin.js'
import { Confirmation } from '../common/model/answer/confirmation/confirmation.js'

const pageTitle = 'Check your answers before sending your application'
const heading = pageTitle

/**
 * @import {NextPage} from '../common/helpers/next-page.js'
 */

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const checkAnswersGetController = {
  handler(req, h) {
    const origin = Origin.fromState(req.yar.get('origin'))

    return h.view('check-answers/index', {
      pageTitle,
      heading,
      origin
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const checkAnswersPostController = {
  handler(req, h) {
    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new Confirmation(payload)

    return h.view('check-answers/index', {
      pageTitle,
      heading,
      confirmation // does nothing but fix lint errors
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
