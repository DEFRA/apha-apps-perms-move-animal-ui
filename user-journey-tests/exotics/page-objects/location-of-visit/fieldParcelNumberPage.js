import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the field parcel number?'

class FieldParcelNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'fieldParcelNumber',
      noInputError: 'Enter the field parcel number'
    })
  }

  pagePath = 'exotics/location-of-visit/field-parcel-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new FieldParcelNumberPage()
