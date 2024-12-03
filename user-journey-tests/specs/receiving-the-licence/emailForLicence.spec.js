import { browser } from '@wdio/globals'

import { loadPageAndVerifyTitle, waitForPagePath } from '../../helpers/page.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'

const validSubmissionCheck = async (input, whitespace = false) => {
  let expected
  if (!whitespace) {
    expected = input
  } else {
    expected = input.trim()
  }
  await emailPage.inputEmailAndContinue(input)
  await expect(emailPage.emailFieldError()).not.toBeDisplayed()
  await emailPage.selectBackLink()
  await browser.refresh()
  await expect(emailPage.emailAddressInput()).toHaveValue(expected)
}

describe('Email address for licence page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(emailPage.pagePath, emailPage.pageTitle)
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await emailPage.emailInputErrorTest('', emailPage.noInputError)
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

  it('Should input correct email format and continue without producing an error', async () => {
    await emailPage.inputEmailAndContinue('bruce.wayne@gotham.com')
    await expect(emailPage.emailFieldError()).not.toBeDisplayed()
    await expect(emailPage.errorSummary).not.toBeDisplayed()

    await waitForPagePath(licenceAnswersPage.pagePath)
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
