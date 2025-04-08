/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'earTags'
const pageHeadingAndTitle =
  'Enter the ear tag numbers of the calves under 42 days old you are planning to move'
const noInputError =
  'Enter the ear tag numbers of the calves under 42 days old you are planning to move'

class EarTagsPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  pagePath = 'identification/enter-ear-tags-calves'
}

export default new EarTagsPage()
