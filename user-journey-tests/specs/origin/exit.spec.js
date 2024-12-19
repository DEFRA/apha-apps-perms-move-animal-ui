import { loadPageAndVerifyTitle } from '../../helpers/page.js'
import exitPage from '../../page-objects/origin/exitPage.js'

describe('Exit page test', () => {
  beforeEach('Navigate to exit page', async () => {
    await loadPageAndVerifyTitle(exitPage.pagePath, exitPage.pageTitle)
  })

  it('Should verify the view application link', async () => {
    await exitPage.verifyViewApplicationLink()
  })
})
