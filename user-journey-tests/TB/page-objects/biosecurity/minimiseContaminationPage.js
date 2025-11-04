/* eslint-disable lines-between-class-members */
import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const checkboxIds = [
  'cleaning',
  'isolation',
  'incoming',
  'disinfection',
  'other'
]

const pageId = 'buildingsHowMinimiseContamination'
const pageHeadingAndTitle =
  'Which measures are being taken to reduce the spread of TB during housing?'
const noInputError =
  'Enter how you will reduce the risk of spreading TB from the resident herd to the incoming animals during housing'

class MinimiseContaminationPage extends CheckboxBasePage {
  pagePath = 'biosecurity/buildings-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds,
      pageId,
      noInputError
    })
  }
}

export default new MinimiseContaminationPage()
