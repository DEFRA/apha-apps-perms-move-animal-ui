import { calculateNextPage } from '../common/helpers/next-page.js'
import { Origin } from '../common/model/section/origin.js'
import { License } from '../common/model/section/license.js'
import { Confirmation } from '../common/model/answer/confirmation/confirmation.js'

export const pageTitle = 'Check your answers before sending your application'
const heading = pageTitle

/**
 * @import {NextPage} from '../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../common/model/answer/confirmation/confirmation.js'
 */

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const checkAnswersGetController = {
  handler(req, res) {
    const tasks = {
      origin: Origin.fromState(req.yar.get('origin')),
      license: License.fromState(req.yar.get('license'))
    }

    const isValid = Object.values(tasks).every(
      (task) => task.validate().isValid
    )

    if (!isValid) {
      return res.redirect('/task-list-incomplete')
    }

    return res.view('check-answers/index', {
      nextPage: req.query.redirect_uri,
      pageTitle,
      ...tasks
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const checkAnswersPostController = {
  handler(req, res) {
    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new Confirmation(payload)

    const { isValid, errors } = confirmation.validate()
    if (!isValid) {
      return res.view('check-answers/index', {
        pageTitle: `Error: ${pageTitle}`,
        heading,
        confirmation,
        errorMessage: errors.confirmation
      })
    }

    return res.redirect(
      calculateNextPage(payload.nextPage, '/submit/confirmation')
    )
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
