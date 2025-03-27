import postExitPage from '../../page-objects/receiving-the-licence/postExitPage.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

describe('Post exit page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to exit page', async () => {
    await postExitPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the complete application link', async () => {
    await postExitPage.verifyCompletePaperApplicationLink()
  })

  it('Should verify the continue with email button', async () => {
    await postExitPage.verifyContinueWithEmailButton()
  })

  it('Should verify radio updated to email when clicking that option', async () => {
    await postExitPage.verifyContinueWithEmailButton()
    await receiveMethodPage.navigateToPageAndVerifyTitle()
    await expect(receiveMethodPage.emailRadio).toBeSelected()
  })
})
