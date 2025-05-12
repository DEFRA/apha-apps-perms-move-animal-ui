import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import biosecIntroPage from '../../page-objects/biosecurity/biosecIntroPage.js'
import { waitForPagePath } from '../../helpers/page.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'

describe('Biosecurity intro page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await biosecIntroPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the page dropdown', async () => {
    await biosecIntroPage.testDropdownFunctionality()
  })

  it('Should verify continue navigates you to correct page', async () => {
    await biosecIntroPage.selectContinue()
    await waitForPagePath(keptSeparatelyPage.pagePath)
  })
})
