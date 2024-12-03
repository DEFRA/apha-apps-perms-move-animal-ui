import { EmailAddress } from '../../common/model/answer/email-address.js'

const indexView = 'license/check-answers/index.njk'
export const pageTitle =
  'Check your answers before you continue your application'
export const heading = pageTitle

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const licenseCheckAnswersGetController = {
  handler(req, h) {
    const license = req.yar.get('license') ?? {}

    const emailAddress = EmailAddress.fromState(
      license?.emailAddress
    ).validate()
    if (!emailAddress.isValid) {
      return h.redirect(
        '/receiving-the-licence/licence-enter-email-address?redirect_uri=/receiving-the-licence/check-answers'
      )
    }

    return h.view(indexView, {
      pageTitle,
      heading,
      license: {
        emailAddress: license?.emailAddress
      }
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const licenseCheckAnswersPostController = {
  handler(_req, h) {
    return h.redirect('/task-list')
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
