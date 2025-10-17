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
import biosecIntroPage from '../../page-objects/biosecurity/biosecIntroPage.js'
import { waitForPagePath } from '../page.js'

// Helper function to complete the origin task
const completeBiosecurityTask = async (radioType, direct = false) => {
  if (!direct) {
    await navigateToTaskList()
    await taskListPage.selectBiosecurityLink(biosecIntroPage)
  } else {
    await biosecIntroPage.navigateToPageAndVerifyTitle()
  }
  await biosecIntroPage.selectContinue()
  await waitForPagePath(keptSeparatelyPage.pagePath)
  switch (radioType) {
    case 'yes':
      await keptSeparatelyPage.selectYesAndContinue(grazingPage)
      await grazingPage.selectYesAndContinue(howFieldSeparatedPage)
      await howFieldSeparatedPage.selectCheckboxesAndContinue(
        [howFieldSeparatedPage['separated-by-roads']],
        lastGrazedPage
      )
      await lastGrazedPage.inputTextAndContinue('2 years', manureAndSlurryPage)
      await manureAndSlurryPage.selectYesAndContinue(manureDetailsPage)
      await manureDetailsPage.inputTextAndContinue(
        'Manure details',
        disinfectantPage
      )
      await disinfectantPage.inputTextAndContinue(
        'Agrichlor',
        disinfectantDilutionPage,
        true
      )
      await disinfectantDilutionPage.selectCheckboxesAndContinue(
        [disinfectantDilutionPage.dilutionRateConfirmed],
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
      await equipmentContaminationPage.selectCheckboxesAndContinue(
        [equipmentContaminationPage.designatedDisinfectionPoints],
        peopleDisinfectionPage
      )
      await peopleDisinfectionPage.selectCheckboxesAndContinue(
        [peopleDisinfectionPage.ppe],
        biosecBadgersPage
      )
      await biosecBadgersPage.selectCheckboxesAndContinue(
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
        'Agrichlor',
        disinfectantDilutionPage,
        true
      )
      await disinfectantDilutionPage.selectCheckboxesAndContinue(
        [disinfectantDilutionPage.dilutionRateConfirmed],
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
      await peopleDisinfectionPage.selectCheckboxesAndContinue(
        [peopleDisinfectionPage.ppe],
        biosecBadgersPage
      )
      await biosecBadgersPage.selectCheckboxesAndContinue(
        [],
        biosecurityAnswersPage
      )
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
}

export default completeBiosecurityTask
