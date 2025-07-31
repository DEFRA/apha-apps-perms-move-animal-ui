import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import originAddressPage from '../../page-objects/movement-orgin/originAddressPage.js'
import originCheckAnswersPage from '../../page-objects/movement-orgin/checkAnswersPage.js'
import productLocationPage from '../../page-objects/movement-orgin/product/productLocationPage.js'
import productCPHNumberPage from '../../page-objects/movement-orgin/product/productCPHNumberPage.js'
import productYesNoCPHPage from '../../page-objects/movement-orgin/product/productYesNoCPHPage.js'

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

const getExpected = (key) => journeyData[key].expected
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('Movement origin - products', async () => {
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

  it('Should complete the movement origin flow', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement origin',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementOrigin(productLocationPage)
    await productLocationPage.selectRadioAndContinue(
      'farm',
      productYesNoCPHPage
    )
    await productYesNoCPHPage.selectYesAndContinue(productCPHNumberPage)
    await productCPHNumberPage.inputParishHoldingNumberAndContinue(
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

    await originCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
  })
})
