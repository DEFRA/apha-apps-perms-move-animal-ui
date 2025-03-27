import { waitForExpectedRedirectUri } from '../../helpers/page.js'
import originCheckAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import fiftyPercentWarningPage from '../../page-objects/origin/fiftyPercentWarningPage.js'

describe('Fifty percent warning page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await fiftyPercentWarningPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that clicking the testing cattle guidance page results in navigating to the selected guidance', async () => {
    await fiftyPercentWarningPage.verifyGetYourCattleTestedLink()
  })

  it('Should verify pressing continue gives takes you to the check answers page (which will redirect you to first unanswered question)', async () => {
    await fiftyPercentWarningPage.selectContinue()
    await waitForExpectedRedirectUri(originCheckAnswersPage.pagePath)
  })
})
