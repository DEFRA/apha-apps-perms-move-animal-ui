/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'buildingsHowMinimiseContamination'
const pageHeadingAndTitle =
  'How will you reduce the risk of spreading TB from the resident herd to the incoming animals during housing?'
const noInputError =
  'Enter how you will reduce the risk of spreading TB from the resident herd to the incoming animals during housing'

class MinimiseContaminationPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/buildings-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new MinimiseContaminationPage()
