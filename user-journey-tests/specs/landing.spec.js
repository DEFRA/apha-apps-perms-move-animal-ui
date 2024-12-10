import landingPage from '../page-objects/landingPage.js'
import { loadPageAndVerifyTitle } from '../helpers/page.js'
import taskListPage from '../page-objects/taskListPage.js'

describe('Landing page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
  })

  it('Should verify start now button visible on landing page', async () => {
    await landingPage.verifyPrivateBetaBanner()
    await landingPage.verifyPageHeadingAndTitle(landingPage.pageHeading)
    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should verify that start now navigates you to first question and back link returns you', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await taskListPage.verifyPageHeadingAndTitle(taskListPage.pageHeading)
    await taskListPage.selectBackLink()

    await landingPage.verifyStartNowButton('Start now')
  })
})
