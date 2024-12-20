import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { loadPageAndVerifyTitle, selectElement } from '../page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'

// Helper function to complete the origin task
const completeDestinationTest = async (radioType) => {
  await loadPageAndVerifyTitle(landingPage.pagePath, landingPage.pageTitle)
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectMovementDestination()
  if (radioType === 'slaughter') {
    await destinationSelectionPage.selectSlaughterRadioAndContinue()
    await selectElement(generalLicencePage.continueLink)
  }
  if (radioType === 'dedicated') {
    await destinationSelectionPage.selectDedicatedSaleAndContinue()
  }
  if (radioType === 'approved') {
    await destinationSelectionPage.selectApprovedFinishingAndContinue()
  }
}

export default completeDestinationTest
