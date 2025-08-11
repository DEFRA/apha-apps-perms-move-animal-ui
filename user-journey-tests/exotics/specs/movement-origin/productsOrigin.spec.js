import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import originAddressPage from '../../page-objects/movement-orgin/originAddressPage.js'
import originCheckAnswersPage from '../../page-objects/movement-orgin/checkAnswersPage.js'
import productLocationPage from '../../page-objects/movement-orgin/product/productLocationPage.js'
import productCPHNumberPage from '../../page-objects/movement-orgin/product/productCPHNumberPage.js'
import productYesNoCPHPage from '../../page-objects/movement-orgin/product/productYesNoCPHPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeMovementOriginSection } from '../../helpers/journey-helpers/movementOrigin.js'

const basePath = '/exotics/movement-origin'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  typeOfProductLocation: {
    expected: 'Farm',
    hrefSuffix: 'product-location'
  },
  productLocationHasACphNumber: {
    expected: 'Yes',
    hrefSuffix: 'product-location/cph-yes-no'
  },
  productLocationCphNumber: {
    expected: '00/000/0000',
    hrefSuffix: 'product-location/cph-number'
  },
  address: {
    expected: 'line one\nts and cs\nb908dg',
    hrefSuffix: 'address'
  }
}

describe('Movement origin - products', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection({
      onOffVisit: 'onto-premises',
      liveAnimals: false
    })
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the movement origin flow', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement origin',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementOrigin(productLocationPage)
    await completeMovementOriginSection({
      route: 'products'
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
