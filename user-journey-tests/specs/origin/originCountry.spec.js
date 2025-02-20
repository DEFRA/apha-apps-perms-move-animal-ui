import { browser } from '@wdio/globals'

import originCountryPage from '../../page-objects/origin/originCountryPage.js'
import importParishPage from '../../page-objects/origin/importParishPage.js'

describe('Country of import test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await originCountryPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await originCountryPage.inputErrorTest('', originCountryPage.noInputError)
  })

  it('Should verify that page errors when too much text is entered is entered', async () => {
    const longString = new Array(256).fill('a').join('')
    await originCountryPage.inputErrorTest(
      longString,
      originCountryPage.maxCharacterError
    )
  })

  it('Should input country and continue without producing an error', async () => {
    await originCountryPage.inputTextAndContinue('France', importParishPage)
    await expect(originCountryPage.fieldError()).not.toBeDisplayed()
    await expect(originCountryPage.errorSummary).not.toBeDisplayed()
  })
})
