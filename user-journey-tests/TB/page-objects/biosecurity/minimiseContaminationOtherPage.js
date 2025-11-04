/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'buildingsHowMinimiseContaminationOther'
const pageHeadingAndTitle =
  'What other measures are being taken to reduce the spread of TB during housing?'
const noInputError =
  'Enter what other measures are being taken to reduce the spread of TB during housing'

class MinimiseContaminationOtherPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/buildings-how-minimise-contamination-other'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new MinimiseContaminationOtherPage()
