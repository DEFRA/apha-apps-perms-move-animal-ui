import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the number plate of the vehicle collecting the milk?'

class NumberPlatePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'vehicleNumber',
      noInputError: 'Enter the vehicle number plate'
    })
  }

  pagePath = 'fmd/movement-details/vehicle-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new NumberPlatePage()
