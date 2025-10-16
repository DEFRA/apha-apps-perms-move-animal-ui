/* eslint-disable lines-between-class-members */
import { CheckboxBasePage } from '../base-pages/checkboxBasePage'

const pageId = 'grazingFieldHowSeparated'
const pageHeadingAndTitle =
  'Which measures are being taken to reduce the spread of TB when the animals are grazing?'
const noInputError =
  'Enter information about how you will separate the incoming animals from the resident herd'

const checkboxIds = [
  'grazingFieldHowSeparated', // Roads
  'grazingFieldHowSeparated-2', // 3 metres
  'grazingFieldHowSeparated-3' // Other
]

class HowFieldSeparatedPage extends CheckboxBasePage {
  constructor() {
    super({ checkboxIds, pageId, noInputError })
  }

  pagePath = 'biosecurity/grazing-field-how-separated'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new HowFieldSeparatedPage()
