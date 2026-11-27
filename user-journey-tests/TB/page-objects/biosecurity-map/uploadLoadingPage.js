import { Page } from '../page.js'
import { validateElementVisibleAndText } from '../../helpers/page.js'

const pageHeadingAndTitle = 'Uploading the biosecurity map'

class UploadLoadingPage extends Page {
  pagePath = 'biosecurity-map/uploading'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async verifyWelshTranslation() {
    await validateElementVisibleAndText(
      this.getPageHeading(),
      "Llwytho'r map bioddiogelwch i fyny"
    )
  }
}

export default new UploadLoadingPage()
