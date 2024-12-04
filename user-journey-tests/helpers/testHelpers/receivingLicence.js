import landingPage from '../../page-objects/landingPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { loadPageAndVerifyTitle } from '../page.js'

// Default data
const defaultEmail = 'batman@gotham.gov.uk'

// Helper function to complete the origin task
const completeLicenceTask = async ({ email = defaultEmail } = {}) => {
  await loadPageAndVerifyTitle(landingPage.pagePath, landingPage.pageTitle)
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectReceiveTheLicence()
  await emailPage.inputEmailAndContinue(email)
}

// Predefined task completion function
export const completeLicenceTaskAnswers = async () => {
  await completeLicenceTask() // Uses default values
}

// Customizable task completion function
export const completeLicenceTaskAnswersCustom = async (email) => {
  await completeLicenceTask({ email })
}

export default completeLicenceTaskAnswers
