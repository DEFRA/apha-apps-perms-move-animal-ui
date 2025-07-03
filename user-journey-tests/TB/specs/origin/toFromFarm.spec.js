import { expect } from '@wdio/globals'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import signInPage from '../../page-objects/signInPage.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import { waitForPagePath } from '../../helpers/page.js'

describe('To from farm page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach(async () => {
    await restoreSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await toFromFarmPage.radioErrorTest()
  })

  it('Should select on the farm radio and continue', async () => {
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
  })

  it('Should choose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue(originTypePage)
    await originTypePage.verifyPageHeadingAndTitle()
    await browser.back()

    await browser.refresh()
    await waitForPagePath(toFromFarmPage.pagePath)

    await expect(toFromFarmPage.offRadio).toBeSelected()
  })
})
