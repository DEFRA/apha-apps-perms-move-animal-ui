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
  urlKey = 'exotics-submit-confirmation'
  urlPath = '/exotics/submit/confirmation'
  pageTitle = title
  pageHeading = title
}

export const exoticsConfirmationPage = new ExoticsConfirmationPage()

class ExoticsConfirmationController extends ConfirmationController {}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticsSubmitConfirmation = new ExoticsConfirmationController(
  exoticsConfirmationPage,
  {
    methods: ['GET']
  }
).plugin()
