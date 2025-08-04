import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import whereAreAnimalsProductsGoingPage from '../../page-objects/movement-destination/whereAreAnimalsProductsGoingPage.js'
import destinationAddressPage from '../../page-objects/movement-destination/destinationAddressPage.js'
import responsibleForDestinationPage from '../../page-objects/movement-destination/responsibleForDestinationPage.js'
import destinationCheckAnswersPage from '../../page-objects/movement-destination/destinationCheckAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

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

const getExpected = (key) => journeyData[key].expected
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('Movement destination - products', async () => {
  // eslint-disable-next-line no-undef
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
    await whereAreAnimalsProductsGoingPage.selectRadioAndContinue(
      'corporate-holding',
      destinationAddressPage
    )
    await destinationAddressPage.fillFormFieldsAndSubmit(
      {
        lineOne: 'line one',
        townOrCity: 'ts and cs',
        postcode: 'b908dg'
      },
      responsibleForDestinationPage
    )
    await responsibleForDestinationPage.inputTextAndContinue(
      'FirstName',
      'LastName',
      destinationCheckAnswersPage
    )

    verifyCheckAnswersPage(
      journeyData,
      basePath,
      redirectUri,
      destinationCheckAnswersPage
    )
  })
})
