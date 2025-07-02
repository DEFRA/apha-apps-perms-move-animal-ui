import landingPage from '../../page-objects/landingPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import signInPage from '../../page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('authorisation', () => {
  beforeEach(async () => browser.reloadSession())

  it('should *not* challenge a user to sign in to the landing page', async () => {
    await landingPage.navigateToPageAndVerifyTitle()
  })

  if (process.env.DEFRA_ID_ENABLED !== 'false') {
    it('should send the user to the desired protected page *via* the login process', async () => {
      await browser.url(originTypePage.pagePath)
      await signInPage.submitWithTestCredentials()
      await originTypePage.verifyPageHeadingAndTitle()
    })

    it('should redirect the user back to /task-list if they have gone straight to login', async () => {
      await browser.url('auth/login')
      await signInPage.submitWithTestCredentials()
      await taskListPage.verifyPageHeadingAndTitle()
    })
  }
})
