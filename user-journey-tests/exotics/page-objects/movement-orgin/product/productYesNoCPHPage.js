import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Does the origin premises have a county parish holding (CPH) number?'

class ProductLocationHasCPHPage extends YesNoRadioPage {
  pagePath = 'exotics/movement-origin/product-location/cph-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'productLocationHasACphNumber',
      noInputError: 'Select if the origin premises has a CPH number'
    })
  }
}

export default new ProductLocationHasCPHPage()
