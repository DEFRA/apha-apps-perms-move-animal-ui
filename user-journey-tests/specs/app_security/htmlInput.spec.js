import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import { completeOriginTaskAnswersCustom } from '../../helpers/testHelpers/movementOrigin.js'
import landingPage from '../../page-objects/landingPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

const defaultCphNumber = '23/678/1234'
const defaultLineOne = `<IMG SRC="x" srcset="x onload=alert('1')">`
const defaultTownOrCity = 'default Gotham'
const defaultPostcode = 'NB2A 1GG'

describe('Security test html input', () => {
  // eslint-disable-next-line no-undef
  before('Sign in and complete origin task', async () => {
    await loginAndSaveSession(signInPage)
    await landingPage.navigateToPageAndVerifyTitle()
    await completeOriginTaskAnswersCustom(
      defaultCphNumber,
      defaultLineOne,
      defaultTownOrCity,
      defaultPostcode
    )
  })

  beforeEach('Navigate to check answers page', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify HTML input is shown as text and not rendered or executed', async () => {
    const addressText = await checkAnswersPage.getValue('address').getText()
    expect(addressText).toContain(defaultLineOne)

    // Ensure the HTML is not rendered (no <img> tag is in the DOM)
    const imgTags = await $$('img')
    expect(imgTags).toHaveLength(0)
  })
})
