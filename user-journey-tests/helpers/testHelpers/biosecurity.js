import { navigateToTaskList } from './taskListNav.js'
import taskListPage from '../../page-objects/taskListPage.js'

import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'
import disinfectantDilutionPage from '../../page-objects/biosecurity/disinfectantDilutionPage.js'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import sharedEquipmentPage from '../../page-objects/biosecurity/sharedEquipmentPage.js'
import equipmentContaminationPage from '../../page-objects/biosecurity/equipmentContaminationPage.js'

// Helper function to complete the origin task
const completeBiosecurityTask = async (radioType) => {
  await navigateToTaskList()
  await taskListPage.selectBiosecurityLink(keptSeparatelyPage)
  switch (radioType) {
    case 'yes':
      await keptSeparatelyPage.selectYesAndContinue(grazingPage)
      await grazingPage.selectYesAndContinue(howFieldSeparatedPage)
      await howFieldSeparatedPage.inputTextAndContinue(
        'Separate grazing',
        lastGrazedPage
      )
      await lastGrazedPage.inputTextAndContinue('2 years', manureAndSlurryPage)
      await manureAndSlurryPage.selectYesAndContinue(manureDetailsPage)
      await manureDetailsPage.inputTextAndContinue(
        'Manure details',
        disinfectantPage
      )
      await disinfectantPage.inputTextAndContinue(
        'Batman disinfectant',
        disinfectantDilutionPage
      )
      await disinfectantDilutionPage.inputTextAndContinue(
        '1995',
        anySharedBuildingsPage
      )
      await anySharedBuildingsPage.selectYesAndContinue(
        minimiseContaminationPage
      )
      await minimiseContaminationPage.inputTextAndContinue(
        'Minimise',
        sharedEquipmentPage
      )
      await sharedEquipmentPage.selectYesAndContinue(equipmentContaminationPage)
      await equipmentContaminationPage.inputTextAndContinue(
        'Shared equipment',
        peopleDisinfectionPage
      )
      await peopleDisinfectionPage.inputTextAndContinue(
        'People disinfection',
        biosecBadgersPage
      )
      await biosecBadgersPage.selectMeasuresAndContinue(
        [],
        biosecurityAnswersPage
      )
      break

    case 'no':
      await keptSeparatelyPage.selectNoAndContinue(manureDetailsPage)
      await manureDetailsPage.inputTextAndContinue(
        'Manage manure',
        disinfectantPage
      )
      await disinfectantPage.inputTextAndContinue(
        'Batman disinfectant',
        disinfectantDilutionPage
      )
      await disinfectantDilutionPage.inputTextAndContinue(
        '1995',
        anySharedBuildingsPage
      )
      await anySharedBuildingsPage.selectYesAndContinue(
        minimiseContaminationPage
      )
      await minimiseContaminationPage.inputTextAndContinue(
        'Minimise contamination',
        sharedEquipmentPage
      )
      await sharedEquipmentPage.selectNoAndContinue(peopleDisinfectionPage)
      await peopleDisinfectionPage.inputTextAndContinue(
        'People disinfection',
        biosecBadgersPage
      )
      await biosecBadgersPage.selectMeasuresAndContinue(
        [],
        biosecurityAnswersPage
      )
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
}

export default completeBiosecurityTask
