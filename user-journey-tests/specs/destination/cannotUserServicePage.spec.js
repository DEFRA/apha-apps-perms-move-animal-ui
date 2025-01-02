import canNotUseServicePage from '../../page-objects/destination/canNotUseServicePage.js'

describe('Cannot use service', () => {
  it('should display a page including a link to the TB204', async () => {
    await canNotUseServicePage.navigateToPageAndVerifyTitle()
    await canNotUseServicePage.verifyViewApplicationLink()
  })
})
