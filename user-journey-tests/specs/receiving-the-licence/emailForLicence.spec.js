import { browser } from '@wdio/globals'

import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'

const validSubmissionCheck = async (input, whitespace = false) => {
  let expected
  if (!whitespace) {
    expected = input
  } else {
    expected = input.trim()
  }
  await emailPage.inputEmailAndContinue(input, ownerNamePage)
  await licenceAnswersPage.selectBackLink()
  await browser.refresh()
  const inputValue = await emailPage.textInput().getValue()
  expect(inputValue).toBe(expected)
}

describe('Email address for licence page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await emailPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await emailPage.singleInputErrorTest('', emailPage.noInputError)
  })

  it('Should verify that page errors email is short and invalid', async () => {
    const invalidInput = 'batman'
    await emailPage.emailInputErrorTest(
      invalidInput,
      emailPage.invalidFormatError
    )
  })

  it('Should verify that page errors email has no @', async () => {
    await emailPage.emailInputErrorTest(
      'batman.gotham.co.uk',
      emailPage.invalidFormatError
    )
  })

  it('Should verify that page errors email has no text after @', async () => {
    await emailPage.emailInputErrorTest('batman@', emailPage.invalidFormatError)
  })

  it('Should verify that input automatically trims whitespace', async () => {
    await validSubmissionCheck(' batman@gotham.com ', true)
  })

  it.skip('Should check answer is maintained when submitting after an error', async () => {
    const validInput = 'batman@gotham.co.uk'
    await emailPage.emailInputErrorTest('', emailPage.noInputError)
    await validSubmissionCheck(validInput)
  })

  it('Should type a valid email and check its maintained', async () => {
    const validInput = 'batman@gotham.co.uk'
    await validSubmissionCheck(validInput)
  })
})
