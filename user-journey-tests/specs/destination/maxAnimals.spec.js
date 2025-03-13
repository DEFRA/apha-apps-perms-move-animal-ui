import { browser } from '@wdio/globals'
import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'
import maximumAnimalsPage from '../../page-objects/destination/maximumAnimalsPage.js'

describe('How many animals page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await maximumAnimalsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await maximumAnimalsPage.singleInputErrorTest(
      '',
      maximumAnimalsPage.noInputError
    )
  })

  it('Should verify that page errors when something other than anumber is entered', async () => {
    await maximumAnimalsPage.singleInputErrorTest(
      'test',
      maximumAnimalsPage.invalidFormatError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await maximumAnimalsPage.inputTextAndContinue('550', reasonForMovementPage)
  })
})
