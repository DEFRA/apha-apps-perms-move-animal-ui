import { browser } from '@wdio/globals'

import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'
import { destinationVariants } from '../../helpers/testHelpers/movementLicence.js'
import { verifyRadioButtonNumber } from '../../helpers/page.js'

describe('Destination selection options test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
  })

  it('Should verify options when On the farm and AFU IS NOT option selected', async () => {
    await destinationVariants(true, false)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await verifyRadioButtonNumber(5)
    await destinationSelectionPage.selectZooAndContinue(destinationCPHPage)
  })

  it('Should verify options when On the farm and AFU IS selected', async () => {
    await destinationVariants(true, true)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await verifyRadioButtonNumber(1)
    await destinationSelectionPage.selectApprovedFinishingAndContinue(
      destinationCPHPage
    )
  })
})
