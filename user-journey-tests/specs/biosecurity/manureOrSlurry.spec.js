import { browser } from '@wdio/globals'

import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'
import { waitForPagePath } from '../../helpers/page.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'

describe('Manure or slurry selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
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
