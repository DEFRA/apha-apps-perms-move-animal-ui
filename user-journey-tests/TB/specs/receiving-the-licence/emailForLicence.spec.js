import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import futureOwnerPage from '../../page-objects/receiving-the-licence/futureOwnerPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

const validSubmissionCheck = async (input, whitespace = false) => {
  const expected = whitespace ? input.trim() : input

  await emailPage.inputTextAndContinue(input, futureOwnerPage)

  // Instead of back+refresh, re-navigate directly
  await emailPage.navigateToPageAndVerifyTitle()

  const inputElement = emailPage.textInput()
  await inputElement.waitForDisplayed({ timeout: 5000 })
  const inputValue = await inputElement.getValue()
  expect(inputValue).toBe(expected)
}

describe('Email address for licence page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await emailPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await emailPage.singleInputErrorTest('', emailPage.noInputError)
  })

  it('Should verify that page errors email is short and invalid', async () => {
    await emailPage.singleInputErrorTest('batman', emailPage.invalidFormatError)
  })

  it('Should verify that page errors email has no @', async () => {
    await emailPage.singleInputErrorTest(
      'batman.gotham.co.uk',
      emailPage.invalidFormatError
    )
  })

  it('Should verify that page errors email has no text after @', async () => {
    await emailPage.singleInputErrorTest(
      'batman@',
      emailPage.invalidFormatError
    )
  })

  it('Should verify that input automatically trims whitespace', async () => {
    await validSubmissionCheck(' batman@gotham.com ', true)
  })

  it.skip('Should check answer is maintained when submitting after an error', async () => {
    const validInput = 'batman@gotham.co.uk'
    await emailPage.singleInputErrorTest('', emailPage.noInputError)
    await validSubmissionCheck(validInput)
  })

  it('Should type a valid email and check its maintained', async () => {
    const validInput = 'batman@gotham.co.uk'
    await validSubmissionCheck(validInput)
  })
})
