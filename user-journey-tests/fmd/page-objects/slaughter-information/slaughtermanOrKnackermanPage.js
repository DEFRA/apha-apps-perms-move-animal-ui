import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle =
  'Will the slaughter be done by a Slaughterman or Knackerman?'

class SlaughtermanOrKnackermanPage extends RadioButtonBasePage {
  pagePath = 'fmd/slaughter-information/slaughterman-or-knackerman'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'slaughterOrKnackerman',
      noInputError: 'Select who the slaughter will be done by',
      valueArray: ['knackerman', 'slaughterman']
    })
  }
}

export default new SlaughtermanOrKnackermanPage()
