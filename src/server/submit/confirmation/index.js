import { config } from '~/src/config/config.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { Page } from '../../common/model/page/page-model.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

const title = 'Your animal disease movement licence application'

export class ConfirmationPage extends Page {
  sectionKey = 'confirmation'
  urlKey = 'submit-confirmation'
  urlPath = '/submit/confirmation'
  view = 'submit/confirmation/index'

  // sends metric that the page was served
  reportMetrics = {
    get: {
      request: false,
      response: true
    }
  }

  pageTitle = title
  pageHeading = title

  viewProps(req) {
    return {
      referenceHTML: `Your reference number<br /><b>${req.yar.get('applicationReference')}</b>`
    }
  }
}

class ConfirmationController extends PageController {
  handleGet(req, h) {
    if (
      config.get('clearSessionDebug') === true ||
      config.get('env') !== 'development'
    ) {
      req.yar.reset()
    }

    return super.handleGet(req, h)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitConfirmation = new ConfirmationController(
  new ConfirmationPage(),
  {
    methods: ['GET']
  }
).plugin()
