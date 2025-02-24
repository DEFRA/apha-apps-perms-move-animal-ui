import {
  selectElement,
  validateElementVisibleAndText,
  waitForElement,
  waitForPagePath
} from '../../helpers/page.js'
import completeDestinationTask from '../../helpers/testHelpers/destination.js'
import completeOriginTaskAnswers from '../../helpers/testHelpers/movementLicence.js'
import canNotUseServicePage from '../../page-objects/destination/canNotUseServicePage.js'
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
    await completeDestinationTask('slaughter')
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Slaughter'
    )

    await selectElement(destinationAnswersPage.changeDestinationLink)
    await expect(destinationSelectionPage.slaughterRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await generalLicencePage.selectContinueLink()
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Slaughter'
    )
  })

  it('Should verify dedicated sale for tb answer and change link', async () => {
    await completeDestinationTask('dedicated')
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Dedicated sale for TB (orange market)'
    )

    await selectElement(destinationAnswersPage.changeDestinationLink)
    await expect(destinationSelectionPage.dedicatedSaleRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Dedicated sale for TB (orange market)'
    )
  })

  it('Should verify approved finishing unit answer and change link', async () => {
    await completeDestinationTask('approved')
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Approved finishing unit (AFU)'
    )

    await selectElement(destinationAnswersPage.changeDestinationLink)
    await expect(destinationSelectionPage.approvedFinishingRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Approved finishing unit (AFU)'
    )
  })

  it('Should verify continue link', async () => {
    await completeDestinationTask('approved')
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Approved finishing unit (AFU)'
    )

    await destinationAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should handle "Another destination" as an exit page & redirect users back to the preceding question', async () => {
    await completeDestinationTask('dedicated')
    await validateElementVisibleAndText(
      destinationAnswersPage.destinationValue,
      'Dedicated sale for TB (orange market)'
    )

    await selectElement(destinationAnswersPage.changeDestinationLink)
    await destinationSelectionPage.selectOtherDestinationAndContinue(
      canNotUseServicePage
    )
    await canNotUseServicePage.selectBackLink()

    await waitForPagePath(destinationSelectionPage.pagePath)
    await destinationSelectionPage.selectBackLink()
    await waitForElement(destinationAnswersPage.destinationValue)
    await browser.refresh()

    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
