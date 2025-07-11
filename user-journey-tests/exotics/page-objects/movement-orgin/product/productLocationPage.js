// pageobjects/TypeOfProductLocationPage.js
import { RadioButtonBasePage } from '../../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where are the products located?'

class TypeOfProductLocationPage extends RadioButtonBasePage {
  pagePath = 'exotics/movement-origin/product-location'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfProductLocation',
      noInputError: 'Select where the products are located',
      valueArray: ['farm', 'corporate-holding', 'domestic-residence', 'other']
    })
  }
}

export default new TypeOfProductLocationPage()
