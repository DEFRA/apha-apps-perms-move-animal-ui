import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import yourNamePage from '../../page-objects/receiving-the-licence/yourNamePage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { validateElementVisibleAndText } from '../page.js'
import { navigateToTaskList } from './taskListNav.js'

// Default data
const defaultEmail = 'eoin.corr@esynergy.co.uk'
const defaultFirstName = 'Bruce'
const defaultLastName = 'Wayne'
const defaultYourFirstName = 'Clark'
const defaultYourLastName = 'Kent'

// Helper function to complete the origin task
const completeLicenceTask = async ({
  email = defaultEmail,
  firstName = defaultFirstName,
  lastName = defaultLastName,
  yourFirstName = defaultYourFirstName,
  yourLastName = defaultYourLastName,
  on = false
} = {}) => {
  await navigateToTaskList()
  await taskListPage.selectReceiveTheLicence(ownerNamePage)

  // When on-farm with TB restricted origin and destination, the flow includes yourNamePage
  if (on) {
    await ownerNamePage.inputTextAndContinue(firstName, lastName, yourNamePage)
    await yourNamePage.inputTextAndContinue(
      yourFirstName,
      yourLastName,
      emailPage
    )
  } else {
    await ownerNamePage.inputTextAndContinue(firstName, lastName, emailPage)
  }

  await emailPage.inputTextAndContinue(email, licenceAnswersPage)

  await licenceAnswersPage.verifyPageHeadingAndTitle()
  await validateElementVisibleAndText(
    licenceAnswersPage.getValue('email'),
    email
  )
}

// Predefined task completion function
export const completeLicenceTaskAnswers = async (on = false) => {
  await completeLicenceTask({ on }) // Uses default values
}

// Customizable task completion function
export const completeLicenceTaskAnswersCustom = async (
  email,
  firstName,
  lastName,
  on = false
) => {
  await completeLicenceTask({ email, firstName, lastName, on })
}

export default completeLicenceTaskAnswers
