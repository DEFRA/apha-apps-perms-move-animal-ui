import { browser } from '@wdio/globals'

import { loadPageAndVerifyTitle } from '../../helpers/page.js'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import { completeOriginTaskAnswersCustom } from '../../helpers/testHelpers/movementLicense.js'
import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import {
  validateAndAdjustAddress,
  validateAndAdjustParishNumber,
  validateOnOffFarm
} from '../../helpers/testHelpers/checkAnswers.js'

const defaultCphNumber = '23/678/1234'
const defaultLineOne = 'default line one'
const defaultTownOrCity = 'default Gotham'
const defaultPostcode = 'NB2A 1GG'

const parishHoldingInput = '45/456/4567'
const lineOne = 'edited line one'
const lineTwo = 'edited line two'
const townOrCity = 'Gotham edited'
const county = 'West new york edited'
const postcode = 'SW1C 2CC'

describe('Check your answers test', () => {
  beforeEach('Navigate to check answers page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
    await completeOriginTaskAnswersCustom(
      defaultCphNumber,
      defaultLineOne,
      defaultTownOrCity,
      defaultPostcode
    )
  })

  it('Should verify the back link is history -1', async () => {
    await loadPageAndVerifyTitle(
      newAddressPage.pagePath,
      newAddressPage.pageTitle
    )
    await newAddressPage.selectContinue()
    await checkAnswersPage.selectBackLink()

    await newAddressPage.addressLineOneInput().isDisplayed()
  })

  it('Should verify the existing radio selection and verify resubmission', async () => {
    await loadPageAndVerifyTitle(
      checkAnswersPage.pagePath,
      checkAnswersPage.pageTitle
    )
    await validateOnOffFarm(
      checkAnswersPage.changeOnOrOffLink,
      checkAnswersPage.onOffFarmValue
    )
  })

  it('Should verify the existing cph number then verify changing the cph number', async () => {
    await loadPageAndVerifyTitle(
      checkAnswersPage.pagePath,
      checkAnswersPage.pageTitle
    )
    await validateAndAdjustParishNumber(
      checkAnswersPage.changeParishNumberLink,
      checkAnswersPage.parishNumberValue,
      defaultCphNumber,
      parishHoldingInput
    )
  })

  it('Should verify the existing data then verify changing the address', async () => {
    await loadPageAndVerifyTitle(
      checkAnswersPage.pagePath,
      checkAnswersPage.pageTitle
    )
    await validateAndAdjustAddress(
      checkAnswersPage.changeAddressLink,
      checkAnswersPage.addressValue,
      {
        lineOne: defaultLineOne,
        townOrCity: defaultTownOrCity,
        postcode: defaultPostcode
      },
      { lineOne, lineTwo, townOrCity, county, postcode }
    )
  })

  it('Should verify submitting answers', async () => {
    await loadPageAndVerifyTitle(
      checkAnswersPage.pagePath,
      checkAnswersPage.pageTitle
    )
    await checkAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle(taskListPage.pageHeading)
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
  })
})
