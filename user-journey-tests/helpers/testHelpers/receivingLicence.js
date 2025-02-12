import landingPage from '../../page-objects/landingPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { validateElementVisibleAndText, waitForPagePath } from '../page.js'

// Default data
const defaultEmail = 'batman@gotham.gov.uk'
const defaultFirstName = 'Bruce'
const defaultLastName = 'Wayne'

// Helper function to complete the origin task
const completeLicenceTask = async ({
  email = defaultEmail,
  firstName = defaultFirstName,
  lastName = defaultLastName
} = {}) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await waitForPagePath(taskListPage.pagePath)
  await taskListPage.selectReceiveTheLicence()
  await waitForPagePath(ownerNamePage.pagePath)
  await ownerNamePage.inputNameAndContinue(firstName, lastName)
  await waitForPagePath(receiveMethodPage.pagePath)
  await receiveMethodPage.selectEmailAndContinue()
  await waitForPagePath(emailPage.pagePath)
  await emailPage.inputEmailAndContinue(email)
  await waitForPagePath(licenceAnswersPage.pagePath)
  await licenceAnswersPage.verifyPageHeadingAndTitle()
  await validateElementVisibleAndText(licenceAnswersPage.emailValue, email)
  await waitForPagePath(licenceAnswersPage.pagePath)
}

// Predefined task completion function
export const completeLicenceTaskAnswers = async () => {
  await completeLicenceTask() // Uses default values
}

// Customizable task completion function
export const completeLicenceTaskAnswersCustom = async (
  email,
  firstName,
  lastName
) => {
  await completeLicenceTask({ email, firstName, lastName })
}

export default completeLicenceTaskAnswers
