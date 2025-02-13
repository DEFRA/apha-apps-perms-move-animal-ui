import { waitForPagePath } from '../../helpers/page.js'
import { Page } from '../page.js'

const pageId = 'buildingsAnyShared'

const pageHeadingAndTitle =
  'Will the cattle share any buildings and equipment with the resident herd?'

class AnySharedBuildingsPage extends Page {
  pagePath = 'biosecurity/buildings-any-shared'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  sharedBuildingsError =
    'Select if the cattle will share any buildings with the resident herd'

  get yesRadio() {
    return $(`#${pageId}`)
  }

  get noRadio() {
    return $('#no')
  }

  radioFieldError() {
    return super.getErrorElement(pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  async selectYesAndContinue(newPage) {
    await super.selectRadioAndContinue(this.yesRadio)
    await waitForPagePath(newPage.pagePath)
  }

  async selectNoAndContinue(newPage) {
    await super.selectRadioAndContinue(this.noRadio)
    await waitForPagePath(newPage.pagePath)
  }

  async sharedBuildingsErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(
      this.radioFieldError(),
      this.sharedBuildingsError
    )
    await super.verifySummaryErrorLink(this.summaryErrorLink(), this.yesRadio)
  }
}

export default new AnySharedBuildingsPage()
