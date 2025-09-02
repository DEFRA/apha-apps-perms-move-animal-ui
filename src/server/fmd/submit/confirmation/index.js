import {
  ConfirmationController,
  ConfirmationPage
} from '~/src/server/common/controller/submit-controller/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

const title = 'Your animal disease movement licence application'

export class FmdConfirmationPage extends ConfirmationPage {
  namespace = 'fmd'
  key = 'fmd-submit-confirmation'
  urlPath = '/fmd/submit/confirmation'
  pageTitle = title
  pageHeading = title
}

export const fmdConfirmationPage = new FmdConfirmationPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fmdSubmitConfirmation = new ConfirmationController(
  fmdConfirmationPage,
  {
    methods: ['GET']
  }
).plugin()
