import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the latitude and longitude measurements for the origin premises?'

class FieldParcelNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'fieldParcelNumber',
      noInputError: 'Enter the field parcel number'
    })
  }

  pagePath = 'exotics/movement-origin/field-parcel-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new FieldParcelNumberPage()
