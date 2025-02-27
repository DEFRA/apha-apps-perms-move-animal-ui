import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'quantityOptions'
const pageHeadingAndTitle =
  'Will the number of cattle be larger than half of the destination herd size?'
const noInputError =
  'Select if the number of cattle will be larger than half of the destination herd size'

class HalfHerdPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'destination/quantity-half-herd'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new HalfHerdPage()
