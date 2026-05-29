import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle = 'Reduction in TB compensation'

class FiftyPercentWarningPage extends Page {
  pagePath = 'tb-origin/reduction-in-tb-compensation'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get getYourCattleTestedLink() {
    // Partial match: the "(opens in new tab)" text sits outside the <a>, so an
    // exact link-text selector would never match the anchor's own text.
    return $('a*=GOV.UK Bovine TB guidance page')
  }

  async verifyGetYourCattleTestedLink() {
    await page.selectLinkAndVerifyTitleInNewTab(
      this.getYourCattleTestedLink,
      'Bovine TB: get your cattle tested in England - GOV.UK',
      'bovine-tb-getting-your-cattle-tested-in-england'
    )
  }
}

export default new FiftyPercentWarningPage()
