import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import { completeOriginTaskAnswersCustom } from '../../helpers/testHelpers/movementOrigin.js'
import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import {
  validateAndAdjustAddress,
  validateAndAdjustParishNumber,
  validateOnOffFarm,
  validateOriginType
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
  // eslint-disable-next-line no-undef
  before('Navigate to check answers page', async () => {
    await landingPage.navigateToPageAndVerifyTitle()
    await completeOriginTaskAnswersCustom(
      defaultCphNumber,
      defaultLineOne,
      defaultTownOrCity,
      defaultPostcode
    )
  })

  it('Should verify the back link is history -1', async () => {
    await newAddressPage.navigateToPageAndVerifyTitle()
    await newAddressPage.selectContinue()
    await checkAnswersPage.selectBackLink()

    await newAddressPage.addressLineOneInput().isDisplayed()
  })

  it('Should verify the existing radio selection and verify resubmission', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await validateOnOffFarm(
      checkAnswersPage.getChangeLink('onOffFarm'),
      checkAnswersPage.getValue('onOffFarm'),
      checkAnswersPage
    )
  })

  it('Should verify origin type selection and verify resubmission', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await validateOriginType(
      checkAnswersPage.getChangeLink('originType'),
      checkAnswersPage.getValue('originType'),
      checkAnswersPage
    )
  })

  it('Should verify the existing cph number then verify changing the cph number', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustParishNumber(
      checkAnswersPage.getChangeLink('parishNumber'),
      checkAnswersPage.getValue('parishNumber'),
      defaultCphNumber,
      parishHoldingInput,
      checkAnswersPage
    )
  })

  it('Should verify the existing data then verify changing the address', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustAddress(
      checkAnswersPage.getChangeLink('address'),
      checkAnswersPage.getValue('address'),
      {
        lineOne: defaultLineOne,
        townOrCity: defaultTownOrCity,
        postcode: defaultPostcode
      },
      { lineOne, lineTwo, townOrCity, county, postcode }
    )
  })

  it('Should verify submitting answers', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await checkAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
  })
})
