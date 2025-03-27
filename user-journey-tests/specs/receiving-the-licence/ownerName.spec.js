import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

const longString = 'a'.repeat(51)

describe('County parish owner name test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to page', async () => {
    await ownerNamePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify errors when nothing is submitted', async () => {
    await ownerNamePage.inputErrorTest()
  })

  it('Should verify just first name error', async () => {
    await ownerNamePage.verifyFirstInputErrors()
  })

  it('Should verify just last name error', async () => {
    await ownerNamePage.verifyLastInputErrors()
  })

  it('Should verify errors when character length is exceeded', async () => {
    await ownerNamePage.fieldLengthErrorTest(longString, longString)
  })

  it('Should verify successful inputs', async () => {
    const firstName = 'Bruce'
    const lastName = 'Wayne'
    await ownerNamePage.inputTextAndContinue(
      firstName,
      lastName,
      receiveMethodPage
    )
    await receiveMethodPage.selectBackLink()

    const firstNameInputValue = await ownerNamePage.firstTextInput().getValue()
    expect(firstNameInputValue).toBe(firstName)

    const lastNameInputValue = await ownerNamePage.lastTextInput().getValue()
    expect(lastNameInputValue).toBe(lastName)
  })
})
