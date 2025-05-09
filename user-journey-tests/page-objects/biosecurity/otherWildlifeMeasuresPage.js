/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'otherWildlifeMeasures'
const pageHeadingAndTitle =
  'What other measures are you taking to reduce the risk of spreading TB?'
const noInputError =
  'Enter information on what other measures are you taking to reduce the risk of spreading TB'

class MinimiseContaminationPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/other-wildlife-measures'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new MinimiseContaminationPage()
