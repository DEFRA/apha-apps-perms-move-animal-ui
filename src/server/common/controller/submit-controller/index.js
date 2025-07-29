import { config } from '~/src/config/config.js'
import { Page } from '../../model/page/page-model.js'
import { PageController } from '../page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

const title = 'Your animal disease movement licence application'

export class ConfirmationPage extends Page {
  namespace

  sectionKey = 'confirmation'
  urlKey = 'submit-confirmation'
  urlPath = '/submit/confirmation'
  view = 'common/controller/submit-controller/index'

  // sends metric that the page was served
  reportMetrics = {
    get: {
      request: false,
      response: true
    }
  }

  pageTitle = title
  pageHeading = title

  get incompletePageUrl() {
    return `/${this.namespace}/task-list-incomplete`
  }

  viewProps(req) {
    const ref = req.yar.get(`${this.namespace}-applicationReference`)
    return {
      referenceHTML: `Your reference number<br /><b>${ref}</b>`
    }
  }
}

export class ConfirmationController extends PageController {
  handleGet(req, h) {
    const page = /** @type {ConfirmationPage} */ (this.page)
    const ref = req.yar.get(`${page.namespace}-applicationReference`)

    if (!ref) {
      req.logger.warn('Application reference missing on confirmation page')
      // If the reference is not set, redirect to the start page
      return h.redirect(page.incompletePageUrl)
    }

    const resp = super.handleGet(req, h)

    if (config.get('clearSessionDebug') === true) {
      req.yar.clear(req.yar.get('state-key'))
      req.yar.clear('state-key')
    }

    return resp
  }
}
