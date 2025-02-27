import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'quantityOptions'
const pageHeadingAndTitle = 'Will you move more than 75 animals?'
const noInputError = 'Select if you will move more than 75 animals'

class QuantityOptionsPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'destination/quantity-options'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new QuantityOptionsPage()
