import landingPage from '../../page-objects/landingPage.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { loadPageAndVerifyTitle } from '../page.js'

// Default data
const defaultLineOne = '37 Made up lane'
const defaultTownOrCity = 'Gotham'
const defaultPostcode = 'SW1A2AA'
const defaultCphNumber = '12/345/6789'

// Helper function to complete the origin task
const completeOriginTask = async ({
  cphNumber = defaultCphNumber,
  lineOne = defaultLineOne,
  townOrCity = defaultTownOrCity,
  postcode = defaultPostcode
} = {}) => {
  await loadPageAndVerifyTitle(landingPage.landingPageUrl, landingPage.landingPageTitleText)
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectMovementOrigin()
  await toFromFarmPage.selectOffFarmAndContinue()
  await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(cphNumber)
  await newAddressPage.fillFormFieldsAndSubmit({
    lineOne,
    townOrCity,
    postcode
  })
}

// Predefined task completion function
export const completeOriginTaskAnswers = async () => {
  await completeOriginTask() // Uses default values
}

// Customizable task completion function
export const completeOriginTaskAnswersCustom = async (
  cphNumber,
  lineOne,
  townOrCity,
  postcode
) => {
  await completeOriginTask({ cphNumber, lineOne, townOrCity, postcode })
}

export default completeOriginTaskAnswers
