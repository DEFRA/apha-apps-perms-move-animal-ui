import { calculateNextPage } from '../../common/helpers/next-page.js'
import { EmailAddress } from '../../common/model/answer/email-address.js'

const indexView = 'license/email-address/index'
export const pageTitle =
  'What email address would you like the licence sent to?'
export const heading = pageTitle

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const getEmailAddressController = {
  handler(req, h) {
    const emailAddress = EmailAddress.fromState(
      req.yar.get('license')?.emailAddress
    )

    return h.view(indexView, {
      nextPage: req.query.redirect_uri,
      pageTitle,
      heading,
      emailAddress
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 * @param req
 */
export const postEmailAddressController = {
  handler(req, res) {
    const payload = /** @type {EmailAddressPayload & NextPage} */ (req.payload)
    const emailAddress = new EmailAddress(req.payload)

    const { isValid, errors } = emailAddress.validate()

    if (!isValid) {
      req.yar.set('license', {
        ...req.yar.get('license'),
        emailAddress: undefined
      })

      return res.view(indexView, {
        nextPage: calculateNextPage(
          payload.nextPage,
          '/receiving-the-licence/check-answers'
        ),
        pageTitle: `Error: ${pageTitle}`,
        heading,
        emailAddress,
        errorMessage: errors.emailAddress
      })
    }

    req.yar.set('license', {
      ...req.yar.get('license'),
      emailAddress: emailAddress.toState()
    })

    return res.redirect('/receiving-the-licence/check-answers')
  }
}

/**
 * @typedef {{ emailAddress: string }} EmailAddressPayload
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { NextPage } from '../../common/helpers/next-page.js'
 */
