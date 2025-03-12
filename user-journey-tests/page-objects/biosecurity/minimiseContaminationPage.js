/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'buildingsHowMinimiseContamination'
const pageHeadingAndTitle =
  'How will you minimise the risk of TB infection from the resident cattle to the incoming cattle during housing?'
const noInputError =
  'Enter how you will minimise the risk of TB infection from the resident cattle to the incoming cattle during housing'

class MinimiseContaminationPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/buildings-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new MinimiseContaminationPage()
