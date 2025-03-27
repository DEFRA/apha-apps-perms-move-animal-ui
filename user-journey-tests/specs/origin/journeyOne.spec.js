import landingPage from '../../page-objects/landingPage.js'
import completeOriginTaskAnswers from '../../helpers/testHelpers/movementOrigin.js'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Full journey test 1', () => {
  beforeEach('Log in and navigate to page', async () => {
    await signInPage.signInUsingTestCredentials()
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('Should navigate you through the first journey happy path', async () => {
    // To do: verify new page
    await completeOriginTaskAnswers()
    await checkAnswersPage.selectContinue()
  })
})
