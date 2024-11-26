import landingPage from '../page-objects/landingPage.js'
import { loadPageAndVerifyTitle } from '../helpers/page.js'
import completeMovementLicenceAnswers from '../helpers/testHelpers/movementLicense.js'
import checkAnswersPage from '../page-objects/checkAnswersPage.js'

describe('Full journey test 1', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.landingPageTitleText)
  })

  it('Should navigate you through the first journey happy path', async () => {
    // To do: verify new page
    await completeMovementLicenceAnswers()
    checkAnswersPage.selectContinue()
  })
})
