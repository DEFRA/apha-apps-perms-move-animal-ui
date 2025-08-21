import { Page } from '~/src/server/common/model/page/page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'
import { calculateNextPage } from '../../../common/helpers/next-page.js'
import { OriginSummaryPage } from '../summary/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class FiftyPercentWarningPage extends Page {
  sectionKey = 'origin'
  urlKey = 'fifty-percent-warning'
  urlPath = `/${this.sectionKey}/${this.urlKey}`
  view = `tb/origin/fifty-percent-warning/index`

  pageTitle = 'Reduction in TB compensation'
  pageHeading = this.pageTitle

  overrideRedirects = true

  nextPage() {
    return new OriginSummaryPage()
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
export const fiftyPercentWarningPage = new FiftyPercentWarningPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fiftyPercentWarning = new PageController(
  new FiftyPercentWarningPage(),
  {
    methods: ['GET']
  }
).plugin()
