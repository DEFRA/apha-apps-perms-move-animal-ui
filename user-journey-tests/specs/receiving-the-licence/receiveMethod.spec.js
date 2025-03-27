import { browser } from '@wdio/globals'
import { waitForPagePath } from '../../helpers/page.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'

describe('Receive method for licence page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await receiveMethodPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await receiveMethodPage.radioErrorTest()
  })

  it('Should select email and continue', async () => {
    await receiveMethodPage.selectEmailAndContinue(emailPage)
    await emailPage.verifyPageHeadingAndTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    await receiveMethodPage.selectEmailAndContinue(emailPage)
    await browser.back()

    await browser.refresh()
    await waitForPagePath(receiveMethodPage.pagePath)

    await expect(receiveMethodPage.emailRadio).toBeSelected()
  })
})
