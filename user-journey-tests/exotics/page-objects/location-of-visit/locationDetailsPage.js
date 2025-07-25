import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the latitude and longitude measurements for the location of the visit?'

class LocationDetailsPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'latitudeAndLongitude',
      noInputError: 'Enter the latitude and longitude measurements'
    })
  }

  pagePath = 'exotics/location-of-visit/location-details'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new LocationDetailsPage()
