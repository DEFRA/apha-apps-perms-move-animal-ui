import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import animalLocationPage from '../../page-objects/movement-orgin/animal/animalLocationPage.js'
import originCheckAnswersPage from '../../page-objects/movement-orgin/checkAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeMovementOriginSection } from '../../helpers/journey-helpers/movementOrigin.js'

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

describe('Movement origin - animal non doms', async () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection({ onOffVisit: 'onto-premises' })
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the movement origin section', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement origin',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementOrigin(animalLocationPage)
    await completeMovementOriginSection({
      route: 'animals-other'
    })

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage: originCheckAnswersPage
    })

    await originCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
  })
})
