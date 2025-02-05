import {
  selectElement,
  validateHrefOfElement,
  waitForPagePath
} from '../helpers/page.js'
import cookiesPage from '../page-objects/cookiesPage.js'
import landingPage from '../page-objects/landingPage.js'
import taskListPage from '../page-objects/taskListPage.js'
import accessibilityStatementPage from '../page-objects/accessibilityStatementPage.js'

describe('Landing page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify start now button visible on landing page', async () => {
    await landingPage.verifyPageHeadingAndTitle()
    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should verify that start now navigates you to first question and back link returns you', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await taskListPage.verifyPageHeadingAndTitle()
    await taskListPage.selectBackLink()

    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should verify the feedback link', async () => {
    validateHrefOfElement(
      landingPage.getFeedbackLink(),
      'https://defragroup.eu.qualtrics.com/jfe/form/SV_7ZDFNwIA2wLF9lk'
    )
  })

  it('Should verify cookie link in the footer', async () => {
    await selectElement(landingPage.getCookiesFooterLink())
    await waitForPagePath(cookiesPage.pagePath)
    await cookiesPage.verifyPageHeadingAndTitle()
  })

  it('Should verify the accessibility link in the footer', async () => {
    await selectElement(landingPage.getAccessibilityFooterLink())
    await waitForPagePath(accessibilityStatementPage.pagePath)
    await accessibilityStatementPage.verifyPageHeadingAndTitle()
  })
})
