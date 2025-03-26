import futureOwnerPage from '../../page-objects/receiving-the-licence/futureOwnerPage.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

describe('Future owner spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to page', async () => {
    await futureOwnerPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify errors when nothing is submitted', async () => {
    await futureOwnerPage.inputErrorTest()
  })

  it('Should verify just first name error', async () => {
    await futureOwnerPage.verifyFirstInputErrors()
  })

  it('Should verify just last name error', async () => {
    await futureOwnerPage.verifyLastInputErrors()
  })

  it('Should verify successful inputs', async () => {
    const firstName = 'Bruce'
    const lastName = 'Wayne'

    await futureOwnerPage.inputTextAndContinue(
      firstName,
      lastName,
      receiveMethodPage
    )
    await receiveMethodPage.selectBackLink()

    const firstNameInputValue = await futureOwnerPage
      .firstTextInput()
      .getValue()
    expect(firstNameInputValue).toBe(firstName)

    const lastNameInputValue = await futureOwnerPage.lastTextInput().getValue()
    expect(lastNameInputValue).toBe(lastName)
  })
})
