import { selectElement } from '../../TB/helpers/page.js'
import { AnswersBasePage } from '../../base-pages/answersBasePage.js'

import { aboutTheMovementChangeLinks } from './about-the-movement/checkAnswersPage.js'
import { animalDisposalChangeLinks } from './disposal-of-the-animal/checkAnswersPage.js'
import { movementDestinationChangeLinks } from './movement-destination/checkAnswersPage.js'
import { movementDetailsChangeLinks } from './movement-details/checkAnswersPage.js'
import { movementOriginChangeLinks } from './movement-origin/checkAnswersPage.js'
import { receivingTheLicenceChangeLinks } from './receiving-the-licence/checkAnswersPage.js'
import { slaughterInfoChangeLinks } from './slaughter-information/checkAnswersPage.js'

const pageHeadingAndTitle = 'Check your answers before sending your application'
const pageId = 'confirmation'

class ReviewPage extends AnswersBasePage {
  pagePath = 'fmd/submit/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  errorMessage = 'You need to tick a declaration box'

  changeLinks = {
    ...aboutTheMovementChangeLinks,
    ...movementDestinationChangeLinks,
    ...movementDetailsChangeLinks,
    ...movementOriginChangeLinks,
    ...receivingTheLicenceChangeLinks,
    ...animalDisposalChangeLinks,
    ...slaughterInfoChangeLinks
  }

  fieldError() {
    return super.getErrorElement(pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  get confirmStatementsCheckbox() {
    return $('[data-testid="confirm-checkbox"]')
  }

  get someoneElseCheckbox() {
    return $('[data-testid="other-checkbox"]')
  }

  async selectADeclarationAndContinue(someoneElse = false) {
    if (!someoneElse) {
      await selectElement(this.confirmStatementsCheckbox, true)
    } else {
      await selectElement(this.someoneElseCheckbox, true)
    }
    await super.selectContinue()
  }

  async submissionErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.fieldError(), this.errorMessage)
    await super.verifySummaryErrorLink(
      this.summaryErrorLink(),
      this.confirmStatementsCheckbox
    )
  }
}

export default new ReviewPage()
