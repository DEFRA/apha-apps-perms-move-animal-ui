import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import animalTypePage from '../../page-objects/about-the-movement/animalTypePage.js'
import whatTypeOfBirdsPage from '../../page-objects/about-the-movement/whatTypeOfBirdsPage.js'
import birdTypeInputPage from '../../page-objects/about-the-movement/birdTypeInputPage.js'
import TypeOfUncommonBirdPage from '../../page-objects/about-the-movement/uncommonBirdTypePage.js'
import animalsQuantityPage from '../../page-objects/about-the-movement/animalsQuantityPage.js'

describe('About the movement - Birds flow', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await animalTypePage.navigateToPageAndVerifyTitle()
  })

  it('Runs through the birds journey pages', async () => {
    await animalTypePage.selectRadioAndContinue('birds', whatTypeOfBirdsPage)
    await whatTypeOfBirdsPage.selectRadioAndContinue(
      'other',
      TypeOfUncommonBirdPage
    )
    await TypeOfUncommonBirdPage.selectRadioAndContinue(
      'other',
      birdTypeInputPage
    )
    await birdTypeInputPage.inputTextAndContinue(
      'Other bird type',
      animalsQuantityPage
    )
  })
})
