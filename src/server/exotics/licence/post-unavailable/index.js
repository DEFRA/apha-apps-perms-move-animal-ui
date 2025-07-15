/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { ActionableExitPage } from '~/src/server/common/model/page/actionable-exit-page-model.js'
import { ExoticsActionableExitPageController } from '../../actionable-exit-page-controller.js'
import {
  emailOrPostPage,
  Answer as EmailOrPostAnswer
} from '../email-or-post/index.js'
import { emailPage } from '../email/index.js'

export class PostUnavailablePage extends ActionableExitPage {
  urlPath =
    '/exotics/receiving-the-licence/select-post-can-not-use-this-service'

  pageTitle = 'This service does not currently send licences by post'
  view = `exotics/licence/post-unavailable/index`
  key = 'postUnavailable'
  sectionKey = 'licence'

  get indirectAction() {
    return {
      page: emailOrPostPage,
      answer: new EmailOrPostAnswer({ emailOrPost: 'email' })
    }
  }

  nextPage() {
    return emailPage
  }

  viewProps() {
    return {
      continueButtonText: 'Continue with email',
      continueButtonClasses: 'govuk-button--secondary'
    }
  }
}
export const postUnavailablePage = new PostUnavailablePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const postUnavailable = new ExoticsActionableExitPageController(
  postUnavailablePage,
  {
    methods: ['GET', 'POST']
  }
).plugin()
