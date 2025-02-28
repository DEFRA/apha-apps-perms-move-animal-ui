import { selectElement, waitForPagePath } from '../../helpers/page.js'
import completeBiosecurityTask from '../../helpers/testHelpers/biosecurity.js'
import { completeDestinationTaskOnFarm } from '../../helpers/testHelpers/destination.js'
import { completeOriginTaskAnswersOnFarm } from '../../helpers/testHelpers/movementLicence.js'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'

describe('Check dynamic nature of flow - biosecurity', () => {
  // eslint-disable-next-line no-undef
  before('Complete answers', async () => {
    await completeOriginTaskAnswersOnFarm()
    await completeDestinationTaskOnFarm()
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
