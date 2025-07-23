import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Will the movement take more than 1 day?'

class MoreThanOneDayPage extends YesNoRadioPage {
  pagePath = 'exotics/movement-details/duration-more-than-one-day'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'isDurationMoreThanOneDay',
      noInputError: 'Select if the movement will take more than 1 day'
    })
  }
}

export default new MoreThanOneDayPage()