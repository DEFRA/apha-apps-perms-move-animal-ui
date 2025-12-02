import destinationEmailAddressPage from '../../page-objects/receiving-the-licence/destinationEmailAddressPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import futureOwnerPage from '../../page-objects/receiving-the-licence/futureOwnerPage.js'

const longString = 'a'.repeat(256)
const invalidEmail = 'invalid-email'
const validEmail = 'eoin.corr@esynergy.co.uk'

describe('Destination email address spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to page', async () => {
    await restoreSession()
    await destinationEmailAddressPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify error when nothing is submitted', async () => {
    await destinationEmailAddressPage.singleInputErrorTest(
      '',
      destinationEmailAddressPage.noInputError
    )
  })

  it('Should verify error when invalid email format is submitted', async () => {
    await destinationEmailAddressPage.singleInputErrorTest(
      invalidEmail,
      destinationEmailAddressPage.invalidFormatError
    )
  })

  it('Should verify error when character length is exceeded', async () => {
    await destinationEmailAddressPage.singleInputErrorTest(
      longString,
      destinationEmailAddressPage.invalidFormatError
    )
  })

  it('Should verify successful input', async () => {
    await destinationEmailAddressPage.inputTextAndContinue(
      validEmail,
      futureOwnerPage
    )
    await licenceAnswersPage.selectBackLink()

    const inputValue = await destinationEmailAddressPage.textInput().getValue()
    expect(inputValue).toBe(validEmail)
  })
})
