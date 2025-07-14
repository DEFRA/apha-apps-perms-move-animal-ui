import {
  ConfirmationController,
  ConfirmationPage
} from '~/src/server/common/controller/submit-controller/confirmation/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

const title = 'Your animal disease movement licence application'

export class TbConfirmationPage extends ConfirmationPage {
  namespace = 'tb'
  urlKey = 'tb-submit-confirmation'
  urlPath = '/tb/submit/confirmation'
  pageTitle = title
  pageHeading = title
}

export const tbConfirmationPage = new TbConfirmationPage()

class TbConfirmationController extends ConfirmationController {}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbSubmitConfirmation = new TbConfirmationController(
  new TbConfirmationPage(),
  {
    methods: ['GET']
  }
).plugin()
