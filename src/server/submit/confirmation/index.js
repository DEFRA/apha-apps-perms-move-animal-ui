import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { Page } from '../../common/model/page/page-model.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class ConfirmationPage extends Page {
  sectionKey = 'confirmation'
  urlKey = 'submit-confirmation'
  urlPath = '/submit/confirmation'
  view = 'submit/confirmation/index'

  pageTitle = 'Your animal disease movement licence application'
  pageHeading = 'Your animal disease movement licence application'
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitConfirmation = new PageController(new ConfirmationPage(), {
  methods: ['GET']
}).plugin()
