import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import { completeOriginTaskAnswersCustom } from '../../helpers/testHelpers/movementLicence.js'
import landingPage from '../../page-objects/landingPage.js'
import { changeOnOffFarmAnswer } from '../../helpers/testHelpers/checkAnswers.js'
import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'

const defaultCphNumber = '23/678/1234'
const defaultLineOne = 'default line one'
const defaultTownOrCity = 'default Gotham'
const defaultPostcode = 'NB2A 1GG'

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

  it('Should verify the existing radio selection and verify resubmission', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await changeOnOffFarmAnswer(
      checkAnswersPage.changeOnOrOffLink,
      'off',
      checkAnswersPage.onOffFarmValue,
      checkAnswersPage
    )
    await validateHrefOfElement(
      checkAnswersPage.changeParishNumberLink,
      '/origin/origin-farm-cph?redirect_uri=/origin/check-answers'
    )
    await validateElementVisibleAndText(
      checkAnswersPage.parishNumberQuestion,
      'What is the County Parish Holding (CPH) number of the farm or premises where the animals are moving off?'
    )

    await validateHrefOfElement(
      checkAnswersPage.changeAddressLink,
      '/origin/origin-farm-address?redirect_uri=/origin/check-answers'
    )
    await validateElementVisibleAndText(
      checkAnswersPage.addressQuestion,
      'What is the address of the farm or premises where the animals are moving off?'
    )
  })
})
