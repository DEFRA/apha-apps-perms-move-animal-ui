import originTypeExitPage from '../../page-objects/origin/originTypeExitPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Origin Type - Cannot use service', () => {
  beforeEach('Log in and navigate to page', async () => {
    await signInPage.signInUsingTestCredentials()
    await originTypeExitPage.navigateToPageAndVerifyTitle()
  })

  it('should display a page including a link to the TB204', async () => {
    await originTypeExitPage.verifyViewApplicationLink()
  })
})
