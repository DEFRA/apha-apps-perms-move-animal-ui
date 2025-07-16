import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import animalLocationPage from '../../page-objects/movement-orgin/animal/animalLocationPage.js'
import animalPremisesTypePage from '../../page-objects/movement-orgin/animal/animalPremisesTypePage.js'
import animalYesNoCPHPage from '../../page-objects/movement-orgin/animal/animalYesNoCPHPage.js'
import animalCPHNumberPage from '../../page-objects/movement-orgin/animal/animalCPHNumberPage.js'
import originAddressPage from '../../page-objects/movement-orgin/originAddressPage.js'
import animalsInFieldPage from '../../page-objects/movement-orgin/animal/animalsInFieldPage.js'
import fieldParcelNumberPage from '../../page-objects/movement-orgin/animal/fieldParcelNumberPage.js'
import designatedPremisesPage from '../../page-objects/movement-orgin/animal/designatedPremisesPage.js'
import animalsOnsitePage from '../../page-objects/movement-orgin/animal/animalsOnsitePage.js'
import originCheckAnswersPage from '../../page-objects/movement-orgin/checkAnswersPage.js'

const basePath = '/exotics/movement-origin'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  typeOfAnimalLocation: {
    expected: 'Other',
    hrefSuffix: 'animal-location'
  },
  typeOfAnimalLocationOther: {
    expected: 'animal premises type',
    hrefSuffix: 'animal-location/enter-premises-type'
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
  },
  areInField: {
    expected: 'Yes',
    hrefSuffix: 'animals-in-field'
  },
  fieldParcelNumber: {
    expected: 'field parcel number',
    hrefSuffix: 'field-parcel-number'
  },
  isDesignatedPremises: {
    expected: 'No',
    hrefSuffix: 'designated-premises'
  },
  animalsOnPremises: {
    expected: 'Lions',
    hrefSuffix: 'animals-onsite'
  }
}

const getExpected = (key) => journeyData[key].expected
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('Movement origin - animal non doms', async () => {
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

  it('Should complete the movement origin section', async () => {
    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Movement origin',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementOrigin(animalLocationPage)
    await animalLocationPage.selectRadioAndContinue(
      'other',
      animalPremisesTypePage
    )
    await animalPremisesTypePage.inputTextAndContinue(
      'animal premises type',
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
      animalsInFieldPage
    )
    await animalsInFieldPage.selectYesAndContinue(fieldParcelNumberPage)
    await fieldParcelNumberPage.inputTextAndContinue(
      'field parcel number',
      designatedPremisesPage
    )
    await designatedPremisesPage.selectNoAndContinue(animalsOnsitePage)
    await animalsOnsitePage.inputTextAndContinue(
      'Lions',
      originCheckAnswersPage
    )

    for (const key of Object.keys(journeyData)) {
      const valueEl = await originCheckAnswersPage.getValue(key)
      const changeLink = await originCheckAnswersPage.getChangeLink(key)

      await expect(valueEl).toHaveTextContaining(getExpected(key))
      await expect(changeLink).toHaveAttribute('href', getExpectedHref(key))
    }

    await originCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
  })
})
