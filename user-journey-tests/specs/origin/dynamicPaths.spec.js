import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import { completeOriginTaskAnswersCustom } from '../../helpers/testHelpers/movementLicence.js'
import landingPage from '../../page-objects/landingPage.js'
import {
  changeOnOffFarmAnswer,
  changeOption
} from '../../helpers/testHelpers/checkAnswers.js'
import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import originCountryPage from '../../page-objects/origin/originCountryPage.js'

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

  it('Should verify the existing radio selection and verify resubmission (moving on the farm)', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await changeOnOffFarmAnswer(
      checkAnswersPage.changeOnOrOffLink,
      'on',
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

  it('Should verify the existing radio selection and verify resubmission (moving on the farm from import)', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
    await changeOption(
      checkAnswersPage.changeOriginTypeLink,
      originTypePage.selectAfterImportAndContinue.bind(originTypePage),
      originCountryPage
    )

    await originCountryPage.inputTextAndContinue('Algeria')

    await validateHrefOfElement(
      checkAnswersPage.changeParishNumberLink,
      '/origin/import-cph?redirect_uri=/origin/check-answers'
    )
    await validateElementVisibleAndText(
      checkAnswersPage.parishNumberQuestion,
      'What is the County Parish Holding (CPH) number of the UK point of entry?'
    )

    await validateHrefOfElement(
      checkAnswersPage.changeAddressLink,
      '/origin/import-address?redirect_uri=/origin/check-answers'
    )
    await validateElementVisibleAndText(
      checkAnswersPage.addressQuestion,
      'What is the address of the UK point of entry?'
    )
  })
})
