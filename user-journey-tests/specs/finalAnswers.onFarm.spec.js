import finalAnswersPage from '../page-objects/finalAnswersPage.js'
import submissionConfirmationPage from '../page-objects/submissionConfirmationPage.js'
import taskListPage from '../page-objects/taskListPage.js'
import { completeApplicationOnFarm } from '../helpers/testHelpers/finalAnswers.js'
import signInPage from '../page-objects/signInPage.js'
import { loginAndSaveSession } from '../helpers/authSessionManager.js'
import { waitForEmail } from '../helpers/emailHelpers/getLatestEmail.js'

describe('Check your final answers test', () => {
  // eslint-disable-next-line no-undef
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

    const isLocalChrome =
      browser.capabilities.browserName === 'chrome' &&
      !browser.capabilities['bstack:options']

    if (isLocalChrome) {
      const referenceNumber =
        await submissionConfirmationPage.getReferenceNumber()

      const email = await waitForEmail(
        'eoin.corr@esynergy.co.uk',
        'Apply for a Bovine Tuberculosis (TB) movement licence'
      )

      expect(email.subject).toContain(
        'Bovine Tuberculosis (TB) movement licence'
      )
      expect(email.status).toMatch(/created|sending|delivered/)
      expect(email.body).toContain(referenceNumber)
    }
  })
})
