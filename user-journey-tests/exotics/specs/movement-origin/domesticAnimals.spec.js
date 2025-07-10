import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import animalLocationPage from '../../page-objects/movement-orgin/animal/animalLocationPage.js'
import animalYesNoCPHPage from '../../page-objects/movement-orgin/animal/animalYesNoCPHPage.js'
import animalCPHNumberPage from '../../page-objects/movement-orgin/animal/animalCPHNumberPage.js'
import originAddressPage from '../../page-objects/movement-orgin/originAddressPage.js'
import originCheckAnswersPage from '../../page-objects/movement-orgin/checkAnswersPage.js'

const basePath = '/exotics/movement-origin'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  typeOfAnimalLocation: {
    expected: 'Domestic residence',
    hrefSuffix: 'animal-location'
  },
  animalLocationHasACphNumber: {
    expected: 'Yes',
    hrefSuffix: 'animal-location/cph-yes-no'
  },
  animalLocationCphNumber: {
    expected: '00/000/0000',
    hrefSuffix: 'animal-location/cph-number'
  },
  address: {
    expected: 'line one\nts and cs\nb908dg',
    hrefSuffix: 'address'
  }
}

const getExpected = (key) => journeyData[key].expected
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('Movement origin - domestic animals', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection('onto-premises', true)
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the movement origin flow', async () => {
    await animalLocationPage.navigateToPageAndVerifyTitle()
    await animalLocationPage.selectRadioAndContinue(
      'domestic-residence',
      animalYesNoCPHPage
    )
    await animalYesNoCPHPage.selectYesAndContinue(animalCPHNumberPage)
    await animalCPHNumberPage.inputParishHoldingNumberAndContinue(
      '00/000/0000',
      originAddressPage
    )
    await originAddressPage.fillFormFieldsAndSubmit(
      {
        lineOne: 'line one',
        townOrCity: 'ts and cs',
        postcode: 'b908dg'
      },
      originCheckAnswersPage
    )

    for (const key of Object.keys(journeyData)) {
      const valueEl = await originCheckAnswersPage.getValue(key)
      const changeLink = await originCheckAnswersPage.getChangeLink(key)

      await expect(valueEl).toHaveTextContaining(getExpected(key))
      await expect(changeLink).toHaveAttribute('href', getExpectedHref(key))
    }
  })
})
