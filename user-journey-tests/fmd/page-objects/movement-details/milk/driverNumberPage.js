import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = "What is the vehicle driver's phone number?"

class DriverNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'driverPhone',
      noInputError: "Enter the vehicle driver's phone number"
    })
  }

  pagePath = 'fmd/movement-details/driver-phone-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DriverNumberPage()
