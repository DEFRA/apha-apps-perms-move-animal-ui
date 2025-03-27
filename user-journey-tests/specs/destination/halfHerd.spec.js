import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import halfHerdPage from '../../page-objects/destination/halfHerdPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

describe('Quantity options page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to page', async () => {
    await halfHerdPage.navigateToPageAndVerifyTitle()
  })

  it('Should chose yes and verify correct next page', async () => {
    await halfHerdPage.selectYesAndContinue(destinationSelectionPage)
  })

  it('Should chose no and verify correct next page', async () => {
    await halfHerdPage.selectNoAndContinue(destinationSelectionPage)
  })

  it('Should chose unknown and verify correct next page', async () => {
    await halfHerdPage.selectUnknownAndContinue(destinationSelectionPage)
  })
})
