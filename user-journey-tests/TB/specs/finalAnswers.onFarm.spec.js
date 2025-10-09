import finalAnswersPage from '../page-objects/finalAnswersPage.js'
import submissionConfirmationPage from '../page-objects/submissionConfirmationPage.js'
import taskListPage from '../page-objects/taskListPage.js'
import { completeApplicationOnFarm } from '../helpers/testHelpers/finalAnswers.js'
import signInPage from '../page-objects/signInPage.js'
import { loginAndSaveSession } from '../helpers/authSessionManager.js'

describe('Check your final answers test', () => {
  
  before('Navigate to check answers page', async () => {
    await loginAndSaveSession(signInPage)

    await completeApplicationOnFarm({
      licence: {
        firstNameDefault: 'firstName',
        lastNameDefault: 'lastName',
        emailDefault: 'eoin.corr@esynergy.co.uk'
      }
    })
  })

  it('Should verify the back link is history -1', async () => {
    await taskListPage.navigateToPageAndVerifyTitle()
    await taskListPage.selectReview()
    await finalAnswersPage.verifyPageHeadingAndTitle()
    await finalAnswersPage.selectBackLink()

    await taskListPage.movementOriginLink.isDisplayed()
  })

  it('should error on submission if checkbox is not selected', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await finalAnswersPage.submissionErrorTest()
  })

  it('should be able to successfully submit', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await finalAnswersPage.selectADeclarationAndContinue()
    await submissionConfirmationPage.verifyPageHeadingAndTitle()
  })
})
