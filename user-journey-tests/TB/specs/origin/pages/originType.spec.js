import originTypePage from '../../../page-objects/origin/originTypePage.js'
import toFromFarmPage from '../../../page-objects/origin/toFromFarmPage.js'
import { verifyRadioButtonNumber } from '../../../helpers/page.js'
import signInPage from '../../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../../helpers/authSessionManager.js'

describe('origin type page test (off farm)', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to origin type page', async () => {
    await restoreSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle(false)
    await toFromFarmPage.selectOffFarmAndContinue(originTypePage)
    await originTypePage.verifyPageHeadingAndTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await verifyRadioButtonNumber(5)
    await originTypePage.originTypeErrorTest(1)
  })
})

describe('origin type page test (on farm)', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session, select on farm, and navigate', async () => {
    await restoreSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle(false)
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    await originTypePage.verifyPageHeadingAndTitle()
  })

  it('Should verify that on farm options are loaded (if on farm was previously selected)', async () => {
    await verifyRadioButtonNumber(4)
  })
})
