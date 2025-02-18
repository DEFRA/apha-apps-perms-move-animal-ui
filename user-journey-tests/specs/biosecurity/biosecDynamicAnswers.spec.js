import { selectElement, waitForPagePath } from '../../helpers/page'
import completeBiosecurityTask from '../../helpers/testHelpers/biosecurity'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage'
import grazingPage from '../../page-objects/biosecurity/grazingPage'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage'

describe('Check dynamic nature of flow - biosecurity', () => {
  // eslint-disable-next-line no-undef
  before('Copmplete answers', async () => {
    await completeBiosecurityTask('no')
    await biosecurityAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the flow is dynamic to depending on answers', async () => {
    await biosecurityAnswersPage.navigateToPageAndVerifyTitle()
    await selectElement(biosecurityAnswersPage.changeIncomingCattleLink)
    await waitForPagePath(keptSeparatelyPage.pagePath)
    await keptSeparatelyPage.selectYesAndContinue(grazingPage)
  })
})
