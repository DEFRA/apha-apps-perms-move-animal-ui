import landingPage from '../../page-objects/landingPage.js'
import completeOriginTaskAnswers from '../../helpers/testHelpers/movementLicence.js'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'

describe('Full journey test 1', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('Should navigate you through the first journey happy path', async () => {
    // To do: verify new page
    await completeOriginTaskAnswers()
    checkAnswersPage.selectContinue()
  })
})
