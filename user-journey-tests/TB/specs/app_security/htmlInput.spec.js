import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import { completeOriginTaskAnswersCustom } from '../../helpers/testHelpers/movementOrigin.js'
import landingPage from '../../page-objects/landingPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

const defaultCphNumber = '23/678/1234'
const defaultLineOne = `<IMG SRC="x" srcset="x onload=alert('1')"><script>window.hacked = true;</script>`
const defaultTownOrCity = 'default Gotham'
const defaultPostcode = 'NB2A 1GG'

describe('Security test html input', () => {
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
    const addressElement = await checkAnswersPage.getValue('address')

    // 1. Check the visible text contains the raw injected value
    const addressText = await addressElement.getText()
    expect(addressText).toContain(`<IMG SRC="x" srcset="x onload=alert('1')">`)
    expect(addressText).toContain(`<script>window.hacked = true;</script>`)

    // 2. Ensure no <img> or <script> tags are rendered
    const imgTags = await addressElement.$$('img')
    expect(imgTags).toHaveLength(0)

    const scriptTags = await addressElement.$$('script')
    expect(scriptTags).toHaveLength(0)

    // 3. Confirm injected JavaScript did NOT execute (i.e. window.hacked was not set)
    const wasHacked = await browser.execute(() => window.hacked)
    expect(wasHacked).toBe(undefined || null)
  })
})
