import {
  loginAndSaveSession,
  restoreSession
} from '../../../helpers/authSessionManager.js'
import signInPage from '../../../page-objects/signInPage.js'
import toFromFarmPage from '../../../page-objects/origin/toFromFarmPage.js'

describe('To from farm page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach(async () => {
    await restoreSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await toFromFarmPage.radioErrorTest()
  })
})
