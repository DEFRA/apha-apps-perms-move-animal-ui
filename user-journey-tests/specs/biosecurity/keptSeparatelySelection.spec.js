import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'

describe('Kept separately selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await keptSeparatelyPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await keptSeparatelyPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await keptSeparatelyPage.selectYesAndContinue(grazingPage)

    await grazingPage.selectBackLink()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await browser.refresh()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await expect(keptSeparatelyPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await keptSeparatelyPage.selectNoAndContinue(manureDetailsPage)

    await manureDetailsPage.selectBackLink()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await browser.refresh()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await expect(keptSeparatelyPage.noRadio).toBeSelected()
  })
})
