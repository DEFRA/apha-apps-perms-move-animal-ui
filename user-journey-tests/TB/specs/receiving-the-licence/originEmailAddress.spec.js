import originEmailAddressPage from '../../page-objects/receiving-the-licence/originEmailAddressPage.js'
import destinationEmailAddressPage from '../../page-objects/receiving-the-licence/destinationEmailAddressPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

const longString = 'a'.repeat(256)
const invalidEmail = 'invalid-email'
const validEmail = 'eoin.corr@esynergy.co.uk'

describe('Origin email address spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to page', async () => {
    await restoreSession()
    await originEmailAddressPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify error when nothing is submitted', async () => {
    await originEmailAddressPage.singleInputErrorTest(
      '',
      originEmailAddressPage.noInputError
    )
  })

  it('Should verify error when invalid email format is submitted', async () => {
    await originEmailAddressPage.singleInputErrorTest(
      invalidEmail,
      originEmailAddressPage.invalidFormatError
    )
  })

  it('Should verify error when character length is exceeded', async () => {
    await originEmailAddressPage.singleInputErrorTest(
      longString,
      originEmailAddressPage.invalidFormatError
    )
  })

  it('Should verify successful input', async () => {
    await originEmailAddressPage.inputTextAndContinue(
      validEmail,
      destinationEmailAddressPage
    )
    await destinationEmailAddressPage.selectBackLink()

    const inputValue = await originEmailAddressPage.textInput().getValue()
    expect(inputValue).toBe(validEmail)
  })
})
