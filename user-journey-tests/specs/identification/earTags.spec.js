import { browser } from '@wdio/globals'

import earTagsPage from '../../page-objects/identification/earTagsPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'

describe('Ear tags page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await earTagsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await earTagsPage.earTagsErrorTest('', earTagsPage.noInputError)
  })

  it('Should input correct input and continue without error', async () => {
    await earTagsPage.inputEarTagsAndContinue(
      '12345678',
      identificationAnswersPage
    )
  })
})
