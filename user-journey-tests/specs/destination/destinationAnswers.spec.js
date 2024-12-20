import {
  selectElement,
  validateElementVisibleAndText,
  waitForPagePath
} from '../../helpers/page.js'
import completeDestinationTest from '../../helpers/testHelpers/destination.js'
import completeOriginTaskAnswers from '../../helpers/testHelpers/movementLicence.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('Check your answers test - destination', () => {
  // eslint-disable-next-line no-undef
  beforeEach('Navigate to check answers page', async () => {
    await browser.reloadSession()
    await completeOriginTaskAnswers()
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify slaughter answer and change link', async () => {
    await completeDestinationTest('slaughter')
    await validateElementVisibleAndText(
      destinationAnswersPage.destiationValue,
      'Slaughter'
    )

    await selectElement(destinationAnswersPage.changeDestinationLink)
    await expect(destinationSelectionPage.slaughterRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await selectElement(generalLicencePage.continueLink)
    await validateElementVisibleAndText(
      destinationAnswersPage.destiationValue,
      'Slaughter'
    )
  })

  it('Should verify slaughter answer and change link', async () => {
    await completeDestinationTest('dedicated')
    await validateElementVisibleAndText(
      destinationAnswersPage.destiationValue,
      'Dedicated sale for TB (orange market)'
    )

    await selectElement(destinationAnswersPage.changeDestinationLink)
    await expect(destinationSelectionPage.dedicatedSaleRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await validateElementVisibleAndText(
      destinationAnswersPage.destiationValue,
      'Dedicated sale for TB (orange market)'
    )
  })

  it('Should verify slaughter answer and change link', async () => {
    await completeDestinationTest('approved')
    await validateElementVisibleAndText(
      destinationAnswersPage.destiationValue,
      'Approved finishing unit (AFU)'
    )

    await selectElement(destinationAnswersPage.changeDestinationLink)
    await expect(destinationSelectionPage.approvedFinishingRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await validateElementVisibleAndText(
      destinationAnswersPage.destiationValue,
      'Approved finishing unit (AFU)'
    )
  })

  it('Should verify continue link', async () => {
    await completeDestinationTest('approved')
    await validateElementVisibleAndText(
      destinationAnswersPage.destiationValue,
      'Approved finishing unit (AFU)'
    )

    await destinationAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })
})
