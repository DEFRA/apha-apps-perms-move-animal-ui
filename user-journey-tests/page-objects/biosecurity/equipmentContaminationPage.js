import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'equipmentHowMinimiseContamination'
const pageHeadingAndTitle =
  'How will you minimise the risk of spread of TB infection to the incoming cattle when using shared equipment?'
const noInputError =
  'Enter how you will minimise the risk of spread of TB infection to the incoming cattle when using shared equipment'

class EquipmentContaminationPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/equipment-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new EquipmentContaminationPage()
