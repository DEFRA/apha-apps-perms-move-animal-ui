import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where are the animal by-products going?'

class DestinationByProductsPage extends RadioButtonBasePage {
  pagePath = 'fmd/disposal-of-animals/ABP-premises-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'animalByProductsDestination',
      noInputError: 'Select where the animal by-products are going',
      valueArray: ['rendering-plant', 'incinerator', 'somewhere-else']
    })
  }
}

export default new DestinationByProductsPage()
