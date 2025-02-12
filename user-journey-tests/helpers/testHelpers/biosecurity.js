import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import roadsAndTracksPage from '../../page-objects/biosecurity/roadsAndTracksPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'

// Helper function to complete the origin task
const completeBiosecurityTask = async (radioType) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectBiosecurityLink()
  switch (radioType) {
    case 'yes':
      await keptSeparatelyPage.selectYesAndContinue(grazingPage)
      await grazingPage.selectYesAndContinue(lastGrazedPage)
      await lastGrazedPage.inputLastGrazedAndContinue(
        '2 years',
        manureAndSlurryPage
      )
      await manureAndSlurryPage.selectYesAndContinue(howFieldSeparatedPage)
      await howFieldSeparatedPage.inputSeparatedGrazingAndContinue(
        'Separate grazing',
        roadsAndTracksPage
      )
      await roadsAndTracksPage.selectYesAndContinue(anySharedBuildingsPage)
      await anySharedBuildingsPage.selectYesAndContinue(
        minimiseContaminationPage
      )
      await minimiseContaminationPage.inputMinimiseContaminationAndContinue(
        'Minimise',
        disinfectionPage
      )
      await disinfectionPage.inputPeopleDisinfectionAndContinue(
        'People disinfection',
        disinfectantPage
      )
      break

    case 'no':
      await keptSeparatelyPage.selectNoAndContinue(disinfectionPage)
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
}

export default completeBiosecurityTask
