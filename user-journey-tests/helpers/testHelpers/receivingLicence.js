import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { validateElementVisibleAndText } from '../page.js'
import { navigateToTaskList } from './taskListNav.js'

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
  await navigateToTaskList()
  await taskListPage.selectReceiveTheLicence(ownerNamePage)
  await ownerNamePage.inputNameAndContinue(
    firstName,
    lastName,
    receiveMethodPage
  )
  await receiveMethodPage.selectEmailAndContinue(emailPage)
  await emailPage.inputTextAndContinue(email, licenceAnswersPage)
  await licenceAnswersPage.verifyPageHeadingAndTitle()
  await validateElementVisibleAndText(licenceAnswersPage.emailValue, email)
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
