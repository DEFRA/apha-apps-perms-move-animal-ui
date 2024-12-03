import { Origin } from '../common/model/section/origin.js'
import { Destination } from '../common/model/section/destination.js'
import { Tests } from '../common/model/section/tests.js'
import { License } from '../common/model/section/license.js'

const pageTitle = 'Check your answers before sending your application'
const heading = pageTitle

/**
 * A GDS styled example task list page controller.
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
 * @import { ServerRoute } from '@hapi/hapi'
 */
