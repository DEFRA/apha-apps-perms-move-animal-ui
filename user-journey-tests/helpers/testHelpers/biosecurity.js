import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'
import { waitForPagePath } from '../page.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'

// Helper function to complete the origin task
const completeBiosecurityTask = async (radioType) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectBiosecurityLink()
  switch (radioType) {
    case 'yes':
      await keptSeparatelyPage.selectYesAndContinue()
      await waitForPagePath(grazingPage.pagePath)
      break

    case 'no':
      await keptSeparatelyPage.selectNoAndContinue()
      await waitForPagePath(disinfectionPage.pagePath)
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
}

export default completeBiosecurityTask
