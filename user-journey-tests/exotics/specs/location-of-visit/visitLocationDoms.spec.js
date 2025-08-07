import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import whereVisitWillTakePlacePage from '../../page-objects/location-of-visit/whereVisitWillTakePlacePage.js'
import checkAnswersPage from '../../page-objects/location-of-visit/checkAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeWhereVisitTakesPlaceSection } from '../../helpers/journey-helpers/locationOfVisit.js'

const basePath = '/exotics/location-of-visit'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  typeOfLocation: {
    expected: 'Domestic residence',
    hrefSuffix: 'visit'
  },
  address: {
    expected: 'line one\nts and cs\nb908dg',
    hrefSuffix: 'address'
  },
  animalsOnPremises: {
    expected: 'Lions',
    hrefSuffix: 'animals-onsite'
  }
}

describe('Location of visit - doms', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection()
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the location of visit section for doms', async () => {
    await taskListPage.selectLocationOfVisit(whereVisitWillTakePlacePage)
    await completeWhereVisitTakesPlaceSection({
      locationType: 'domestic-residence'
    })

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage
    })
  })
})
