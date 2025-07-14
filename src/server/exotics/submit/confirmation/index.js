import {
  ConfirmationController,
  ConfirmationPage
} from '~/src/server/common/controller/submit-controller/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

const title = 'Your animal disease movement licence application'

export class ExoticsConfirmationPage extends ConfirmationPage {
  namespace = 'exotics'
  key = 'exotics-submit-confirmation'
  urlPath = '/exotics/submit/confirmation'
  pageTitle = title
  pageHeading = title
}

export const exoticsConfirmationPage = new ExoticsConfirmationPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticsSubmitConfirmation = new ConfirmationController(
  exoticsConfirmationPage,
  {
    methods: ['GET']
  }
).plugin()
