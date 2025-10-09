import { waitForPagePath } from '../helpers/page.js'
import { completeApplication } from '../helpers/testHelpers/finalAnswers.js'
import finalAnswersPage from '../page-objects/finalAnswersPage.js'
import submissionConfirmationPage from '../page-objects/submissionConfirmationPage.js'
import signInPage from '../page-objects/signInPage.js'
import { loginAndSaveSession } from '../helpers/authSessionManager.js'

const originDefaultObject = {
  defaultCphNumber: '23/678/1234',
  defaultLineOne: 'default line one',
  defaultTownOrCity: 'default Gotham',
  defaultPostcode: 'NB2A 1GG'
}

const licenceDefaultObject = {
  firstNameDefault: 'firstName',
  lastNameDefault: 'lastName',
  emailDefault: 'eoin.corr@esynergy.co.uk'
}

describe('declarations', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach(async () => {
    await completeApplication(originDefaultObject, licenceDefaultObject)
  })

  it('Should submit the page after selecting first declaration', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await finalAnswersPage.selectADeclarationAndContinue()
    await waitForPagePath(submissionConfirmationPage.pagePath)
  })

  it('Should submit the page after selecting second declaration', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await finalAnswersPage.selectADeclarationAndContinue(true)
    await waitForPagePath(submissionConfirmationPage.pagePath)
  })

  it('Should verify errors when trying to submit without selecting a declaration', async () => {
    // This test must go last because it changes the page title
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await finalAnswersPage.submissionErrorTest()
  })
})
