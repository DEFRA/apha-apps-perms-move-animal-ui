import landingPage from '../../page-objects/landingPage.js'

describe('Landing page test without JavaScript', () => {
  beforeEach('Navigate to page', async () => {
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('shows the landing page content', async () => {
    await landingPage.verifyPageHeadingAndTitle()
    await landingPage.verifyStartNowButton('Start now')
  })
})
