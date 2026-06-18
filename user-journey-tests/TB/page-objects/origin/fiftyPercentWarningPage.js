import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle = 'Reduction in TB compensation'

class FiftyPercentWarningPage extends Page {
  pagePath = '/origin/fifty-percent-warning'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get getYourCattleTestedLink() {
    return $('a=GOV.UK Bovine TB guidance page')
  }

  async verifyGetYourCattleTestedLink() {
    await page.selectLinkAndVerifyTitleInNewTab(
      this.getYourCattleTestedLink,
      'Bovine TB: get your cattle tested in England - GOV.UK'
    )
  }
}

export default new FiftyPercentWarningPage()
