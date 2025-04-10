import { Page } from '../../common/model/page/page-model.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { earTagsCalvesPage } from '../ear-tag-calves/index.js'

export class IdentificationWarningPage extends Page {
  pageTitle = 'Your application might be unsuccessful'
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/warning`
  isInterstitial = true

  view = `identification/warning/index`

  nextPage() {
    return earTagsCalvesPage
  }

  viewProps() {
    return {
      nextPage: this.nextPage().urlPath
    }
  }
}

export class IdentificationWarningController extends PageController {
  pluginName = 'identification-warning'
}

export const identificationWarningPage = new IdentificationWarningPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identificationWarning = new IdentificationWarningController(
  identificationWarningPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
