/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'otherStaffMeasures'
const pageHeadingAndTitle =
  'What other measures are in place to clean and disinfect staff to reduce the risk of spreading TB?'
const noInputError =
  'Enter what other measures staff are taking to reduce the risk of spreading TB'

class OtherStaffMeasuresPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/other-staff-measures'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OtherStaffMeasuresPage()
