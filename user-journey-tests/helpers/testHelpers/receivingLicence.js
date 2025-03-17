import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import futureOwnerPage from '../../page-objects/receiving-the-licence/futureOwnerPage.js'
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
  lastName = defaultLastName,
  on = false
} = {}) => {
  await navigateToTaskList()
  if (!on) {
    await taskListPage.selectReceiveTheLicence(ownerNamePage)
    await ownerNamePage.inputTextAndContinue(
      firstName,
      lastName,
      receiveMethodPage
    )
  } else {
    await taskListPage.selectReceiveTheLicence(futureOwnerPage)
    await futureOwnerPage.inputTextAndContinue(
      firstName,
      lastName,
      receiveMethodPage
    )
  }
  await receiveMethodPage.selectEmailAndContinue(emailPage)
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
