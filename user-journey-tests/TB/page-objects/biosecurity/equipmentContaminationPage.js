import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const pageId = 'equipmentHowMinimiseContamination'
const pageHeadingAndTitle =
  'Which measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'
const noInputError =
  'Select which measures are in place to clean and disinfect equipment to reduce the risk of spreading TB'

const checkboxIds = [
  'designatedDisinfectionPoints',
  'disinfectingMachinery',
  'disinfectingMilkingAndHandling',
  'equipmentNotShared',
  'other'
]

class EquipmentDisinfectionMeasuresPage extends CheckboxBasePage {
  pagePath = 'biosecurity/equipment-how-minimise-contamination'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds,
      pageId,
      noInputError
    })
  }
}

export default new EquipmentDisinfectionMeasuresPage()
