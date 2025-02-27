import { browser } from '@wdio/globals'

import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import { waitForPagePath } from '../../helpers/page.js'

describe('Manure or slurry selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await manureAndSlurryPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the manure or slurry page errors when no option is selected', async () => {
    await manureAndSlurryPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await manureAndSlurryPage.selectYesAndContinue(howFieldSeparatedPage)

    await howFieldSeparatedPage.selectBackLink()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await browser.refresh()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await expect(manureAndSlurryPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await manureAndSlurryPage.selectNoAndContinue(howFieldSeparatedPage)

    await howFieldSeparatedPage.selectBackLink()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await browser.refresh()
    await waitForPagePath(manureAndSlurryPage.pagePath)

    await expect(manureAndSlurryPage.noRadio).toBeSelected()
  })
})
