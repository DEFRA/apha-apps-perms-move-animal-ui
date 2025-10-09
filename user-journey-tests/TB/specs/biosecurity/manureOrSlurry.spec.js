import { browser } from '@wdio/globals'
import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'
import { waitForPagePath } from '../../helpers/page.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Manure or slurry selection test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await manureAndSlurryPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the manure or slurry page errors when no option is selected', async () => {
    await manureAndSlurryPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await manureAndSlurryPage.selectYesAndContinue(manureDetailsPage)

    await manureDetailsPage.selectBackLink()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await browser.refresh()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await expect(manureAndSlurryPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await manureAndSlurryPage.selectNoAndContinue(manureDetailsPage)

    await manureDetailsPage.selectBackLink()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await browser.refresh()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await expect(manureAndSlurryPage.noRadio).toBeSelected()
  })
})
