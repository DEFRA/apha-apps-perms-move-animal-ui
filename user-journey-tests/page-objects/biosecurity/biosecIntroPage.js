import {
  selectElement,
  validateHrefOfElement,
  waitForElement
} from '../../helpers/page.js'
import { Page } from '../page.js'

const pageHeadingAndTitle = 'Biosecurity on your farm or premises'
const guidanceLinkHref =
  'https://www.gov.uk/guidance/protect-cattle-against-tb-infection-in-high-and-low-incidence-areas'

class BiosecIntroPage extends Page {
  pagePath = 'biosecurity/biosecurity-intro'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get guidanceSummary() {
    return $('.govuk-details__summary-text')
  }

  get guidanceDetails() {
    return $('.govuk-details__text')
  }

  get guidanceLink() {
    return this.guidanceDetails.$('a')
  }

  async testDropdownFunctionality() {
    const link = await this.guidanceLink

    if (await link.isClickable()) {
      throw new Error(
        'Expected link to NOT be clickable before expanding dropdown'
      )
    }

    await selectElement(this.guidanceSummary)
    await waitForElement(link)

    if (!(await link.isClickable())) {
      throw new Error('Expected link to be clickable after expanding dropdown')
    }

    await validateHrefOfElement(link, guidanceLinkHref)
  }
}

export default new BiosecIntroPage()
