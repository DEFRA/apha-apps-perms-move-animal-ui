// page-objects/WildlifeMeasuresPage.js
import { selectElement, waitForPagePath } from '../../helpers/page.js'
import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Which measures are you taking to reduce the risk of infection from wildlife?'

class WildlifeMeasuresPage extends Page {
  pagePath = 'biosecurity/badgers'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  // Checkbox getters
  get badgerProofFencing() {
    return $('[data-testid="badgerProofFencing-checkbox"]')
  }

  get aluminiumFeedBins() {
    return $('[data-testid="aluminiumFeedBins-checkbox"]')
  }

  get limitAccessToBadgerHabitat() {
    return $('[data-testid="limitAccessToBadgerHabitat-checkbox"]')
  }

  get troughsAbove90cm() {
    return $('[data-testid="troughsAbove90cm-checkbox"]')
  }

  get securedFeedStores() {
    return $('[data-testid="securedFeedStores-checkbox"]')
  }

  get licksOutOfReach() {
    return $('[data-testid="licksOutOfReach-checkbox"]')
  }

  get otherMeasures() {
    return $('[data-testid="other-checkbox"]')
  }

  async selectMeasuresAndContinue(checkboxes, nextPage) {
    for (const checkbox of checkboxes) {
      await selectElement(checkbox, true)
    }
    await super.selectContinue()
    if (nextPage) {
      await waitForPagePath(nextPage.pagePath)
    }
  }

  async verifyAllCheckboxesExist() {
    const checkboxes = [
      this.badgerProofFencing,
      this.aluminiumFeedBins,
      this.limitAccessToBadgerHabitat,
      this.troughsAbove90cm,
      this.securedFeedStores,
      this.licksOutOfReach,
      this.otherMeasures
    ]

    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeExisting()
    }
  }
}

export default new WildlifeMeasuresPage()
