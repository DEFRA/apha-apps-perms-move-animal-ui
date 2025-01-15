import postExistPage from '../../page-objects/receiving-the-licence/postExistPage.js'

describe('Post exit page test', () => {
  beforeEach('Navigate to exit page', async () => {
    await postExistPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the complete application link', async () => {
    await postExistPage.verifyCompleteApplicationLink()
  })

  it('Should verify the continue with email button', async () => {
    await postExistPage.verifyContinueWithEmailButton()
  })
})
