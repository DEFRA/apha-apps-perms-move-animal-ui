import { calculateNextPage } from '../common/helpers/next-page.js'
import { Origin } from '../common/model/section/origin.js'
import { Licence } from '../common/model/section/licence.js'
import { Confirmation } from '../common/model/answer/confirmation/confirmation.js'
import { Application } from '../common/model/application/application.js'

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
      licence: Licence.fromState(req.yar.get('licence'))
    }

    const application = Application.fromState({
      origin: req.yar.get('origin'),
      licence: req.yar.get('licence')
    })

    const { isValid } = application.validate()

    if (!isValid) {
      return res.redirect('/task-list-incomplete')
    }

    return res.view('check-answers/index', {
      nextPage: req.query.redirect_uri,
      heading,
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
    const tasks = {
      origin: Origin.fromState(req.yar.get('origin')),
      licence: Licence.fromState(req.yar.get('licence'))
    }

    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new Confirmation(payload)

    const { isValid, errors } = confirmation.validate()

    if (!isValid) {
      return res.view('check-answers/index', {
        pageTitle: `Error: ${pageTitle}`,
        heading,
        confirmation,
        errorMessages: Confirmation.errorMessages(errors),
        errorMessage: errors.confirmation,
        ...tasks
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
