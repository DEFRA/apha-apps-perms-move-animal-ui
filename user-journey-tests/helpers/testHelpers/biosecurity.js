import { navigateToTaskList } from './taskListNav.js'
import taskListPage from '../../page-objects/taskListPage.js'

import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import roadsAndTracksPage from '../../page-objects/biosecurity/roadsAndTracksPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'
import disinfectantDilutionPage from '../../page-objects/biosecurity/disinfectantDilutionPage.js'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'

// Helper function to complete the origin task
const completeBiosecurityTask = async (radioType) => {
  await navigateToTaskList()
  await taskListPage.selectBiosecurityLink(keptSeparatelyPage)
  switch (radioType) {
    case 'yes':
      await keptSeparatelyPage.selectYesAndContinue(grazingPage)
      await grazingPage.selectYesAndContinue(lastGrazedPage)
      await lastGrazedPage.inputTextAndContinue('2 years', manureAndSlurryPage)
      await manureAndSlurryPage.selectYesAndContinue(howFieldSeparatedPage)
      await howFieldSeparatedPage.inputTextAndContinue(
        'Separate grazing',
        roadsAndTracksPage
      )
      await roadsAndTracksPage.selectYesAndContinue(anySharedBuildingsPage)
      await anySharedBuildingsPage.selectYesAndContinue(
        minimiseContaminationPage
      )
      await minimiseContaminationPage.inputTextAndContinue(
        'Minimise',
        peopleDisinfectionPage
      )
      await peopleDisinfectionPage.inputTextAndContinue(
        'People disinfection',
        disinfectantPage
      )
      await disinfectantPage.inputTextAndContinue(
        'Batman disinfectant',
        disinfectantDilutionPage
      )
      await disinfectantDilutionPage.inputTextAndContinue(
        '1995',
        biosecBadgersPage
      )
      await biosecBadgersPage.selectOptionsAndContinue(
        [biosecBadgersPage.aluminiumFeedBins],
        biosecurityAnswersPage
      )
      break

    case 'no':
      await keptSeparatelyPage.selectNoAndContinue(peopleDisinfectionPage)
      await peopleDisinfectionPage.inputTextAndContinue(
        'People disinfection',
        disinfectantPage
      )
      await disinfectantPage.inputTextAndContinue(
        'Batman disinfectant',
        disinfectantDilutionPage
      )
      await disinfectantDilutionPage.inputTextAndContinue(
        '1995',
        biosecBadgersPage
      )
      await biosecBadgersPage.selectOptionsAndContinue(
        [biosecBadgersPage.aluminiumFeedBins],
        biosecurityAnswersPage
      )
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
}

export default completeBiosecurityTask
