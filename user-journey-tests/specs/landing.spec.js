import {
  selectElement,
  switchToNewTab,
  waitForFullPageUrl
} from '../helpers/page.js'
import landingPage from '../page-objects/landingPage.js'
import taskListPage from '../page-objects/taskListPage.js'

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
    await selectElement(landingPage.getFeedbackLink())
    await switchToNewTab()
    await waitForFullPageUrl(
      'https://defragroup.eu.qualtrics.com/jfe/form/SV_7ZDFNwIA2wLF9lk'
    )
  })
})
