import { loginAndSaveSession } from '../helpers/authSessionManager.js'
import { selectElement, waitForPagePath } from '../helpers/page.js'
import landingPage from '../page-objects/landingPage.js'
import signInPage from '../page-objects/signInPage.js'
import taskListPage from '../page-objects/taskListPage.js'

describe('Sign out flow test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to task list page', async () => {
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify account management link', async () => {
    await selectElement(taskListPage.getAccountManagementFooterLink())
    await waitForPagePath('/management/account-management/me')
  })

  it('Shoud verify sign out flow navigates you to home page with no session', async () => {
    await selectElement(taskListPage.getSignOutFooterLink())
    await landingPage.verifyPageHeadingAndTitle()
    await selectElement(landingPage.startNowButton)
    await waitForPagePath('/login/signin/creds')
  })
})
