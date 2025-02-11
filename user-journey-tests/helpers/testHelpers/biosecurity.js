import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'
import { waitForPagePath } from '../page.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import roadsAndTracksPage from '../../page-objects/biosecurity/roadsAndTracksPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'

// Helper function to complete the origin task
const completeBiosecurityTask = async (radioType) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectBiosecurityLink()
  switch (radioType) {
    case 'yes':
      await keptSeparatelyPage.selectYesAndContinue()
      await waitForPagePath(grazingPage.pagePath)
      await grazingPage.selectYesAndContinue()
      await waitForPagePath(lastGrazedPage.pagePath)
      await lastGrazedPage.inputLastGrazedAndContinue('2 years')
      await waitForPagePath(manureAndSlurryPage.pagePath)
      await manureAndSlurryPage.selectYesAndContinue()
      await waitForPagePath(howFieldSeparatedPage.pagePath)
      await howFieldSeparatedPage.inputSeparatedGrazingAndContinue(
        'Separate grazing'
      )
      await waitForPagePath(roadsAndTracksPage.pagePath)
      await roadsAndTracksPage.selectYesAndContinue()
      await waitForPagePath(anySharedBuildingsPage.pagePath)
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
