import { browser } from '@wdio/globals'

import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'
import { destinationVariants } from '../../helpers/testHelpers/movementLicence.js'

describe('Destination selection options test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
  })

  it('Should verify options when On the farm and AFU IS NOT option selected', async () => {
    await destinationVariants({ onFarm: true, afu: false })
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await destinationSelectionPage.verifyRadioButtonNumber(5)
    await destinationSelectionPage.selectZooAndContinue(destinationCPHPage)
  })

  it('Should verify options when On the farm and AFU IS selected', async () => {
    await destinationVariants({ onFarm: true, afu: true })
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await destinationSelectionPage.verifyRadioButtonNumber(1)
    await destinationSelectionPage.selectApprovedFinishingAndContinue(
      destinationCPHPage
    )
  })
})
