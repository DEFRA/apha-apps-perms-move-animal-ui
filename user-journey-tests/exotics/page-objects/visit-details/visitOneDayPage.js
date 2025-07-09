import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Will the visit take more than 1 day?'

class VisitOneDayPage extends YesNoRadioPage {
  pagePath = 'exotics/visit-details/duration-more-than-one-day'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'isDurationMoreThanOneDay',
      noInputError: 'Select if the visit will take more than 1 day'
    })
  }
}

export default new VisitOneDayPage()
