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
    expected: 'Farm',
    hrefSuffix: 'visit'
  },
  cphNumber: {
    expected: '00/000/0000',
    hrefSuffix: 'cph-number'
  },
  address: {
    expected: 'line one\nts and cs\nb908dg',
    hrefSuffix: 'address'
  },
  inRpaRegisteredField: {
    expected: 'No',
    hrefSuffix: 'rpa-field'
  },
  latitudeAndLongitude: {
    expected: 'LAT AND LONG',
    hrefSuffix: 'location-details'
  },
  isDesignatedPremises: {
    expected: "I don't know",
    hrefSuffix: 'designated-premises'
  },
  animalsOnPremises: {
    expected: 'Lions',
    hrefSuffix: 'animals-onsite'
  }
}

describe('Location of visit - non doms', async () => {
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

  it('Should complete the location of visit section for non doms', async () => {
    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Location of visit',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectLocationOfVisit(whereVisitWillTakePlacePage)
    await completeWhereVisitTakesPlaceSection()

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage
    })

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Location of visit',
      expectedStatus: 'Completed'
    })
  })
})
