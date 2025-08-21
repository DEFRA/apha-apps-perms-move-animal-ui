import { Page } from '../../../common/model/page/page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'
import { earTagsCalvesPage } from '../ear-tags-calves/index.js'
import { calculateNextPage } from '../../../common/helpers/next-page.js'

export class IdentificationWarningPage extends Page {
  pageTitle = 'Your application might be unsuccessful'
  sectionKey = 'identification'
  pageKey = 'warning'
  urlPath = `/${this.sectionKey}/warning`
  overrideRedirects = true

  view = `tb/identification/warning/index`

  nextPage() {
    return earTagsCalvesPage
  }

  async viewProps(req) {
    return Promise.resolve({
      continueUrl: calculateNextPage(
        req?.query?.redirect_uri,
        this.nextPage().urlPath
      )
    })
  }
}

export const identificationWarningPage = new IdentificationWarningPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identificationWarning = new PageController(
  identificationWarningPage,
  {
    methods: ['GET']
  }
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
