import { selectElement, waitForPagePath } from '../../helpers/page.js'
import completeBiosecurityTask from '../../helpers/testHelpers/biosecurity.js'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

describe('Check dynamic nature of flow - biosecurity', () => {
  // eslint-disable-next-line no-undef
  before('Sign in and complete answers', async () => {
    await loginAndSaveSession(signInPage)
    await completeBiosecurityTask('no', true)
    await biosecurityAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the flow is dynamic to depending on answers', async () => {
    await biosecurityAnswersPage.navigateToPageAndVerifyTitle()
    await selectElement(biosecurityAnswersPage.getChangeLink('incomingCattle'))
    await waitForPagePath(keptSeparatelyPage.pagePath)
    await keptSeparatelyPage.selectYesAndContinue(grazingPage)
  })
})
