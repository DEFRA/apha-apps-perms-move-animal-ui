import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle =
  'Which measures are you taking to reduce contamination from wildlife?'

class BiosecBadgersPage extends Page {
  pagePath = 'biosecurity/badgers'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  get badgerProofFencing() {
    return $('[data-testid="badgerProofFencing-checkbox"]')
  }

  get aluminiumFeedBins() {
    return $('[data-testid="aluminiumFeedBins-checkbox"]')
  }

  get limitAccess() {
    return $('[data-testid="limitAccessToBadgerHabitat-checkbox"]')
  }

  get troughAboveHeight() {
    return $('[data-testid="troughsAbove90cm-checkbox"]')
  }

  get licksOutOfReach() {
    return $('[data-testid="licksOutOfReach-checkbox"]')
  }

  get otherOption() {
    return $('[data-testid="other-checkbox"]')
  }

  get tbGuidanceLink() {
    return $('=read the guidance on the TB Hub')
  }

  async verifyTbLicenceLink() {
    await page.validateHrefOfElement(
      this.tbGuidanceLink,
      'https://tbhub.co.uk/preventing-tb-breakdowns/protect-your-herd-from-bovine-tb/protect-your-herd-from-tb-a-review-of-the-science/'
    )
  }

  async selectOptionsAndContine(selectionElements, nextPage) {
    await selectionElements.forEach(async (selection) => {
      await page.selectElement(selection, true)
    })
    await super.selectContinue()
    await page.waitForPagePath(nextPage.pagePath)
  }
}

export default new BiosecBadgersPage()
