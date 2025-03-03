import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { validateElementVisibleAndText, waitForPagePath } from '../page.js'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import onFarmCPHPage from '../../page-objects/origin/onFarmCPHPage.js'
import fiftyPercentWarningPage from '../../page-objects/origin/fiftyPercentWarningPage.js'
import onFarmAddressPage from '../../page-objects/origin/onFarmAddressPage.js'
import { navigateToTaskList } from './taskListNav.js'

// Default data
const defaultLineOne = '37 Made up lane'
const defaultTownOrCity = 'Gotham'
const defaultPostcode = 'SW1A2AA'
const defaultCphNumber = '12/345/6789'

const navigateToOriginFlow = async () => {
  await navigateToTaskList()
  await taskListPage.selectMovementOrigin(toFromFarmPage)
}

// Helper function to complete the origin task
const completeOriginTask = async ({
  onOffFarm = 'off',
  cphNumber = defaultCphNumber,
  lineOne = defaultLineOne,
  townOrCity = defaultTownOrCity,
  postcode = defaultPostcode
} = {}) => {
  await navigateToOriginFlow()
  if (onOffFarm === 'on') {
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    await originTypePage.selectTBRestrictedFarmAndContinue(onFarmCPHPage)
    await onFarmCPHPage.inputParishHoldingNumberAndContinue(
      cphNumber,
      onFarmAddressPage
    )
    await onFarmAddressPage.fillFormFieldsAndSubmit(
      {
        lineOne,
        townOrCity,
        postcode
      },
      fiftyPercentWarningPage
    )
    await fiftyPercentWarningPage.selectContinue()
  } else {
    await toFromFarmPage.selectOffFarmAndContinue(originTypePage)
    await originTypePage.selectTBRestrictedFarmAndContinue(
      parishHoldingNumberPage
    )
    await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      cphNumber,
      newAddressPage
    )
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity,
      postcode
    })
  }

  await waitForPagePath(checkAnswersPage.pagePath)
  await checkAnswersPage.verifyPageHeadingAndTitle()
  await validateElementVisibleAndText(
    checkAnswersPage.parishNumberValue,
    cphNumber
  )
}

// Predefined task completion function
export const completeOriginTaskAnswers = async () => {
  await completeOriginTask() // Uses default values
}

export const completeOriginTaskAnswersOnFarm = async () => {
  await completeOriginTask({ onOffFarm: 'on' }) // Uses default values
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

export const destinationVariants = async (onFarm, afu) => {
  const finalPage = onFarm ? fiftyPercentWarningPage : checkAnswersPage
  const addressPageType = onFarm ? onFarmAddressPage : newAddressPage

  await navigateToOriginFlow()

  if (onFarm) {
    toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    if (afu)
      originTypePage.selectApprovedFinishingUnitAndContinue(
        parishHoldingNumberPage
      )
    else
      originTypePage.selectTBRestrictedFarmAndContinue(parishHoldingNumberPage)
  } else {
    toFromFarmPage.selectOffFarmAndContinue(originTypePage)
    if (afu)
      originTypePage.selectApprovedFinishingUnitAndContinue(onFarmCPHPage)
    else originTypePage.selectTBRestrictedFarmAndContinue(onFarmCPHPage)
  }

  await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
    defaultCphNumber,
    addressPageType
  )

  await newAddressPage.fillFormFieldsAndSubmit({
    lineOne: defaultLineOne,
    townOrCity: defaultTownOrCity,
    postcode: defaultPostcode
  })

  await waitForPagePath(finalPage.pagePath)
}

export default completeOriginTaskAnswers
