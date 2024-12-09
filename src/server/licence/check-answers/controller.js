import { Licence } from '../../common/model/section/licence.js'

const indexView = 'licence/check-answers/index.njk'
export const pageTitle =
  'Check your answers before you continue your application'
export const heading = pageTitle

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const licenceCheckAnswersGetController = {
  handler(req, h) {
    const licence = Licence.fromState(req.yar.get('licence'))
    const { isValid, result } = licence.validate()

    if (!isValid && !result.emailAddress.isValid) {
      return h.redirect(
        '/receiving-the-licence/licence-enter-email-address?redirect_uri=/receiving-the-licence/check-answers'
      )
    }

    return h.view(indexView, {
      pageTitle,
      heading,
      licence
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const licenceCheckAnswersPostController = {
  handler(_req, h) {
    return h.redirect('/task-list')
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
