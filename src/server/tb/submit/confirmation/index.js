import {
  ConfirmationController,
  ConfirmationPage
} from '~/src/server/common/controller/submit-controller/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

const title = 'Your animal disease movement licence application'

export class TbConfirmationPage extends ConfirmationPage {
  namespace = 'tb'
  key = 'tb-submit-confirmation'
  urlPath = '/tb/submit/confirmation'
  pageTitle = title
  pageHeading = title
}

export const tbConfirmationPage = new TbConfirmationPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbSubmitConfirmation = new ConfirmationController(
  tbConfirmationPage,
  {
    methods: ['GET']
  }
).plugin()
