import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const pageId = 'buildingsHowMinimiseContamination'
const pageHeadingAndTitle =
  'Which measures are being taken to reduce the spread of TB during housing?'
const noInputError =
  'Enter how you will reduce the risk of spreading TB from the resident herd to the incoming animals during housing'
const checkboxIds = [
  'cleaning',
  'isolation',
  'incoming',
  'disinfection',
  'other'
]

class BuildingMinimiseContaminationPage extends CheckboxBasePage {
  constructor() {
    super({ checkboxIds, pageId, noInputError })
  }

  pagePath = 'biosecurity/buildings-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new BuildingMinimiseContaminationPage()
