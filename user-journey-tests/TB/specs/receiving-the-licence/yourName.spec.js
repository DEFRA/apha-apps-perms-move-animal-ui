import yourNamePage from '../../page-objects/receiving-the-licence/yourNamePage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

const longString = 'a'.repeat(51)

describe('Your name spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to page', async () => {
    await restoreSession()
    await yourNamePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify errors when nothing is submitted', async () => {
    await yourNamePage.inputErrorTest()
  })

  it('Should verify just first name error', async () => {
    await yourNamePage.verifyFirstInputErrors()
  })

  it('Should verify just last name error', async () => {
    await yourNamePage.verifyLastInputErrors()
  })

  it('Should verify errors when character length is exceeded', async () => {
    await yourNamePage.fieldLengthErrorTest(longString, longString)
  })

  it('Should verify successful inputs', async () => {
    const firstName = 'Bruce'
    const lastName = 'Wayne'
    await yourNamePage.inputTextAndContinue(firstName, lastName, emailPage)
    await emailPage.selectBackLink()

    const firstNameInputValue = await yourNamePage.firstTextInput().getValue()
    expect(firstNameInputValue).toBe(firstName)

    const lastNameInputValue = await yourNamePage.lastTextInput().getValue()
    expect(lastNameInputValue).toBe(lastName)
  })
})
