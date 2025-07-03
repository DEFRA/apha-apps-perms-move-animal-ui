import { waitForPagePath } from '../../helpers/page.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Receive method for licence page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await receiveMethodPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await receiveMethodPage.radioErrorTest()
  })

  it('Should select email and continue', async () => {
    await receiveMethodPage.selectEmailAndContinue(emailPage)
    await emailPage.verifyPageHeadingAndTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    await receiveMethodPage.selectEmailAndContinue(emailPage)
    await browser.back()

    await browser.refresh()
    await waitForPagePath(receiveMethodPage.pagePath)

    await expect(receiveMethodPage.emailRadio).toBeSelected()
  })
})
