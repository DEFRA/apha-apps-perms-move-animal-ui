/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'otherEquipmentMeasures'
const pageHeadingAndTitle = 'What other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'
const noInputError = 'Enter what other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'

class OtherEquipmentMeasuresPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/other-equipment-measures'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OtherEquipmentMeasuresPage()
