import { browser } from '@wdio/globals'
import howManyAnimalsPage from '../../page-objects/destination/howManyAnimalsPage.js'
import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'

describe('How many animals page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await howManyAnimalsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await howManyAnimalsPage.singleInputErrorTest(
      '',
      howManyAnimalsPage.noInputError
    )
  })

  it('Should verify that page errors when something other than anumber is entered', async () => {
    await howManyAnimalsPage.singleInputErrorTest(
      'test',
      howManyAnimalsPage.invalidFormatError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await howManyAnimalsPage.inputTextAndContinue(
      '550',
      reasonForMovementPage
    )
  })
})
