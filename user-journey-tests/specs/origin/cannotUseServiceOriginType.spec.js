import originTypeExitPage from '../../page-objects/origin/originTypeExitPage.js'

describe('Origin Type - Cannot use service', () => {
  it('should display a page including a link to the TB204', async () => {
    await originTypeExitPage.navigateToPageAndVerifyTitle()
    await originTypeExitPage.verifyViewApplicationLink()
  })
})
