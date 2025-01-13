import { browser } from '@wdio/globals'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'

describe('Receive method for licence page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await receiveMethodPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await receiveMethodPage.receiveMethodErrorTest()
  })

  it('Should select email and continue', async () => {
    await receiveMethodPage.selectEmailAndContinue()
    await expect(receiveMethodPage.pageError).not.toBeDisplayed()
    await expect(receiveMethodPage.errorSummary).not.toBeDisplayed()
    await emailPage.verifyPageHeadingAndTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    await receiveMethodPage.selectEmailAndContinue()
    await emailPage.verifyPageHeadingAndTitle()
    await browser.back()
    await expect(receiveMethodPage.emailRadio).toBeSelected()
  })
})
