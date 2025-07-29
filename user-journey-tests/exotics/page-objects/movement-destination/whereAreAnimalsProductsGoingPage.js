import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where are the animals or products going?'

class WhereAreAnimalsProductsGoingPage extends RadioButtonBasePage {
  pagePath = 'exotics/movement-destination/location-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfLocation',
      noInputError: 'Select where the animals or products are going',
      valueArray: ['farm', 'corporate-holding', 'domestic-residence', 'other']
    })
  }
}

export default new WhereAreAnimalsProductsGoingPage()
