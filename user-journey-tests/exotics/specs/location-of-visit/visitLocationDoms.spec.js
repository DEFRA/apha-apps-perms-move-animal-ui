import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import whereVisitWillTakePlacePage from '../../page-objects/location-of-visit/whereVisitWillTakePlacePage.js'
import visitAddressPage from '../../page-objects/location-of-visit/visitAddressPage.js'
import whatAnimalsOnPremisesPage from '../../page-objects/location-of-visit/whatAnimalsOnPremisesPage.js'
import checkAnswersPage from '../../page-objects/location-of-visit/checkAnswersPage.js'

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

const getExpected = (key) => journeyData[key].expected
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('Location of visit - doms', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection('visit')
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the location of visit section for doms', async () => {
    await taskListPage.selectLocationOfVisit(whereVisitWillTakePlacePage)
    await whereVisitWillTakePlacePage.selectRadioAndContinue(
      'domestic-residence',
      visitAddressPage
    )
    await visitAddressPage.fillFormFieldsAndSubmit(
      {
        lineOne: 'line one',
        townOrCity: 'ts and cs',
        postcode: 'b908dg'
      },
      whatAnimalsOnPremisesPage
    )
    await whatAnimalsOnPremisesPage.inputTextAndContinue(
      'Lions',
      checkAnswersPage
    )

    for (const key of Object.keys(journeyData)) {
      const valueEl = await checkAnswersPage.getValue(key)
      const changeLink = await checkAnswersPage.getChangeLink(key)

      await expect(valueEl).toHaveTextContaining(getExpected(key))
      await expect(changeLink).toHaveAttribute('href', getExpectedHref(key))
    }
  })
})
