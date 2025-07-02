import { Page } from '../page.js'

const pageHeadingAndTitle = 'Uploading the biosecurity map'

class UploadLoadingPage extends Page {
  pagePath = 'biosecurity-map/uploading'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new UploadLoadingPage()
