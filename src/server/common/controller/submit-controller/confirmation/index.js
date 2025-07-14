import { config } from '~/src/config/config.js'
import { Page } from '../../../model/page/page-model.js'
import { PageController } from '../../page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

const title = 'Your animal disease movement licence application'

export class ConfirmationPage extends Page {
  namespace

  constructor(namespace) {
    super()
    this.namespace = namespace
  }

  sectionKey = 'confirmation'
  urlKey = 'submit-confirmation'
  urlPath = '/submit/confirmation'
  view = 'common/controller/submit-controller/confirmation/index'

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
    const ref = req.yar.get(`${this.namespace}-applicationReference`)
    return {
      referenceHTML: `Your reference number<br /><b>${ref}</b>`
    }
  }
}

export class ConfirmationController extends PageController {
  handleGet(req, h) {
    const resp = super.handleGet(req, h)

    if (config.get('clearSessionDebug') === true) {
      req.yar.reset()
    }

    return resp
  }
}
