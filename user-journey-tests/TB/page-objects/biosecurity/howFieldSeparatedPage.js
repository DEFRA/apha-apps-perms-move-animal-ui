/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'grazingFieldHowSeparated'
const pageHeadingAndTitle =
  'How will you separate the incoming animals from the resident herd?'
const noInputError =
  'Enter information about how you will separate the incoming animals from the resident herd'

class HowFieldSeparatedPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/grazing-field-how-separated'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new HowFieldSeparatedPage()
