import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import { completeOriginTaskAnswersCustom } from '../../helpers/testHelpers/movementOrigin.js'
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
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

const redirect = `?redirect_uri=/${checkAnswersPage.pagePath}`

const defaultCphNumber = '23/678/1234'
const defaultLineOne = 'default line one'
const defaultTownOrCity = 'default Gotham'
const defaultPostcode = 'NB2A 1GG'

const questions = {
  parishFarm:
    'What is the county parish holding (CPH) number of the farm or premises where the animals are moving off?',
  parishImport:
    'What is the county parish holding (CPH) number of the UK point of entry?',
  addressFarm:
    'What is the address of the farm or premises where the animals are moving off?',
  addressImport: 'What is the address of the UK point of entry?'
}

const verifyChangeLinkAndQuestion = async (
  field,
  expectedPath,
  expectedQuestion
) => {
  await validateHrefOfElement(
    await checkAnswersPage.getChangeLink(field),
    `${expectedPath}${redirect}`
  )
  await validateElementVisibleAndText(
    await checkAnswersPage.getQuestion(field),
    expectedQuestion
  )
}

describe('Check your answers test', () => {
  // eslint-disable-next-line no-undef
  before('Sign in and complete origin task', async () => {
    await loginAndSaveSession(signInPage)
    await landingPage.navigateToPageAndVerifyTitle()
    await completeOriginTaskAnswersCustom(
      defaultCphNumber,
      defaultLineOne,
      defaultTownOrCity,
      defaultPostcode
    )
  })

  beforeEach('Navigate to check answers page', async () => {
    await checkAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the existing radio selection and verify resubmission (moving on the farm)', async () => {
    await changeOnOffFarmAnswer(
      await checkAnswersPage.getChangeLink('onOffFarm'),
      'on',
      await checkAnswersPage.getValue('onOffFarm'),
      checkAnswersPage
    )

    await verifyChangeLinkAndQuestion(
      'parishNumber',
      '/origin/origin-farm-cph',
      questions.parishFarm
    )
    await verifyChangeLinkAndQuestion(
      'address',
      '/origin/origin-farm-address',
      questions.addressFarm
    )
  })

  it('Should verify the existing radio selection and verify resubmission (moving on the farm from import)', async () => {
    await changeOption(
      await checkAnswersPage.getChangeLink('originType'),
      originTypePage.selectAfterImportAndContinue.bind(originTypePage),
      originCountryPage
    )

    await originCountryPage.inputTextAndContinue('Algeria')

    await verifyChangeLinkAndQuestion(
      'parishNumber',
      '/origin/import-cph',
      questions.parishImport
    )
    await verifyChangeLinkAndQuestion(
      'address',
      '/origin/import-address',
      questions.addressImport
    )
  })
})
