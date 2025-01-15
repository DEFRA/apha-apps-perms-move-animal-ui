import { ExitPage } from '../../common/model/page/exit-page-model.js'
import { PostExitPageController } from './post-exit-page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class PostExitPage extends ExitPage {
  urlPath =
    '/receiving-the-licence/licence-select-post-can-not-use-this-service'

  pageTitle = 'This service does not currently send licences by post'
  view = `licence/postExitPage/index`
  key = 'post'
  sectionKey = 'licence'

  viewProps() {
    return {
      continueButtonText: 'Continue with email',
      continueButtonClasses: 'govuk-button--secondary'
    }
  }
}
export const postExitPage = new PostExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const postExit = new PostExitPageController(postExitPage, {
  methods: ['GET', 'POST']
}).plugin()
