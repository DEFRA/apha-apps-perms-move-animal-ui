/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'earTags'
const pageHeadingAndTitle = 'Enter the ear tag numbers for these animals'
const noInputError =
  'Enter the ear tag numbers of the animals you are planning to move'

class EarTagsOver42DaysOldPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  pagePath = 'identification/enter-ear-tags-over-42-days'
}

export default new EarTagsOver42DaysOldPage()
