import loadPageAndVerifyTitle from '../helpers/loadPageHelper.js'
import exitPage from '../page-objects/exitPage.js'

describe('Exit page test', () => {
  beforeEach('Navigate to exit page', async () => {
    await loadPageAndVerifyTitle(
      exitPage.exitPageUrlPath,
      exitPage.exitPageTitle
    )
  })

  it('Should verify the view application link', async () => {
    await exitPage.verifyViewApplicationLink()
  })

  it('Should verify the gov uk link', async () => {
    await exitPage.verifyGovUkLink()
  })
})
