import { calculateNextPage } from '../common/helpers/next-page.js'
import { OriginSection } from '../common/model/section/origin/origin.js'
import { LicenceSection } from '../common/model/section/licence/licence.js'
import { ConfirmationAnswer } from '../common/model/answer/confirmation/confirmation.js'
import { ApplicationModel } from '../common/model/application/application.js'
import { sectionToSummary } from '../common/templates/macros/create-summary.js'

export const pageTitle = 'Check your answers before sending your application'
const heading = pageTitle

/**
 * @import {NextPage} from '../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../common/model/answer/confirmation/confirmation.js'
 */

const checkAnswersUrlPath = '/submit/check-answers'

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const checkAnswersGetController = {
  handler(req, res) {
    const tasks = {
      origin: OriginSection.fromState(req.yar.get('origin')),
      licence: LicenceSection.fromState(req.yar.get('licence'))
    }

    const application = ApplicationModel.fromState({
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
      origin: sectionToSummary(tasks.origin, checkAnswersUrlPath),
      licence: sectionToSummary(tasks.licence, checkAnswersUrlPath)
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const checkAnswersPostController = {
  handler(req, res) {
    const tasks = {
      origin: OriginSection.fromState(req.yar.get('origin')),
      licence: LicenceSection.fromState(req.yar.get('licence'))
    }

    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new ConfirmationAnswer(payload)

    const { isValid, errors } = confirmation.validate()

    if (!isValid) {
      return res.view('check-answers/index', {
        pageTitle: `Error: ${pageTitle}`,
        heading,
        confirmation,
        errorMessages: ConfirmationAnswer.errorMessages(errors),
        errorMessage: errors.confirmation,
        origin: sectionToSummary(tasks.origin, checkAnswersUrlPath),
        licence: sectionToSummary(tasks.licence, checkAnswersUrlPath)
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
