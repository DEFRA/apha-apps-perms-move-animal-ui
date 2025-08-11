import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import animalLocationPage from '../../page-objects/movement-orgin/animal/animalLocationPage.js'
import animalYesNoCPHPage from '../../page-objects/movement-orgin/animal/animalYesNoCPHPage.js'
import animalCPHNumberPage from '../../page-objects/movement-orgin/animal/animalCPHNumberPage.js'
import originAddressPage from '../../page-objects/movement-orgin/originAddressPage.js'
import originCheckAnswersPage from '../../page-objects/movement-orgin/checkAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeMovementOriginSection } from '../../helpers/journey-helpers/movementOrigin.js'

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

describe('Movement origin - domestic animals', async () => {
  // eslint-disable-next-line no-undef
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

  it('Should complete the movement origin flow', async () => {
    await animalLocationPage.navigateToPageAndVerifyTitle()
    await completeMovementOriginSection({
      route: 'animals-domestic'
    })

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage: originCheckAnswersPage
    })
  })
})
