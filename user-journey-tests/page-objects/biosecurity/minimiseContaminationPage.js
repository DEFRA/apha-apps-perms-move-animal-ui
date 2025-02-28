/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'buildingsHowMinimiseContamination'
const pageHeadingAndTitle =
  'How will you minimise the risk from buildings and equipment used for the incoming cattle and any other cattle?'
const noInputError =
  'Enter how you will minimise the risk from shared buildings and any equipment used for the incoming cattle and any other cattle'

class MinimiseContaminationPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/buildings-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new MinimiseContaminationPage()
