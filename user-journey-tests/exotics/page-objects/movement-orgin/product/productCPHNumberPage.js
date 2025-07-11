import { CPHBasePage } from '../../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle = 'What is the CPH number for the origin premises?'

class ProductCPHNumberPage extends CPHBasePage {
  pagePath = 'exotics/movement-origin/product-location/cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new ProductCPHNumberPage()
