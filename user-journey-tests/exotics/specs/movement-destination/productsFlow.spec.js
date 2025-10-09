import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import whereAreAnimalsProductsGoingPage from '../../page-objects/movement-destination/whereAreAnimalsProductsGoingPage.js'
import destinationCheckAnswersPage from '../../page-objects/movement-destination/destinationCheckAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeDestinationSection } from '../../helpers/journey-helpers/movementDestination.js'

const basePath = '/exotics/movement-destination'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  typeOfLocation: {
    expected: 'Corporate holding',
    hrefSuffix: 'location-type'
  },
  address: {
    expected: 'line one\nts and cs\nb908dg',
    hrefSuffix: 'address'
  },
  responsiblePersonName: {
    expected: 'FirstName LastName',
    hrefSuffix: 'responsible-person-name'
  }
}

describe('Movement destination - products', async () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection('onto-premises', false)
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the movement destination section for products', async () => {
    await whereAreAnimalsProductsGoingPage.navigateToPageAndVerifyTitle()
    await completeDestinationSection({ liveAnimals: false })

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage: destinationCheckAnswersPage
    })
  })
})
